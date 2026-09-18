---
title: "Getting Emails as They Arrive with Microsoft Graph and Python"
date: "2026-09-18"
tag: "Microsoft Graph"
category: "Integration"
excerpt: "How I used Microsoft Graph change notifications, a FastAPI webhook and ngrok to process emails as they arrive."
---

After connecting my mailbox to Microsoft Graph, I could read emails from Python. The next problem was knowing when a new message arrived.

I could have asked Microsoft Graph for new messages every few seconds. That would have worked, but it meant repeatedly checking the mailbox even when nothing had changed.

I wanted the application to react to an email as it arrived.

The solution was to use Microsoft Graph change notifications. Graph sends a notification to a public webhook when a new inbox message appears. My app then fetches the full message and its attachments.

The flow looks like this:

```text
Microsoft 365 mailbox
        │
        ▼
Microsoft Graph notification
        │
        ▼
Public HTTPS webhook
        │
        ▼
FastAPI notification endpoint
        │
        ▼
SQLite queue and background worker
        │
        ├── Fetch email body and attachments
        ├── Save them on the server
        └── Analyze and summarize selected emails
```

## Step 1 — From Reading Emails to Reacting to Them

My previous post covered the Entra app registration, delegated `Mail.Read` permission, and authentication with Azure Identity.

I reused that setup here. The Python application still authenticates to Microsoft Graph with the same delegated permission. The change was adding a way for Graph to notify the application when a message arrived.

A change notification is a signal that something happened. It does not replace fetching the message. After receiving the notification, my app uses the message ID to request the email details from Graph.

## Step 2 — The Webhook Needed a Public Address

A webhook is an HTTP endpoint that another service can call. During local development, my FastAPI application listens on:

```text
http://localhost:8000
```

That address works on my computer, but Microsoft Graph cannot call my computer’s `localhost`. Graph needs a public HTTPS URL that can reach the running application.

For testing, I used ngrok:

```powershell
ngrok http 8000
```

Ngrok provides an HTTPS address and forwards requests to port `8000` on my computer. I used that address in my `.env` file, with the application’s notification route at the end:

```env
NOTIFICATION_URL=https://my-ngrok-host.ngrok-free.app/notifications
```

The route matters. If the configured URL does not end at `/notifications`, Graph will call a different path and receive a `404 Not Found`.

For production, the same idea applies, but the notification URL should point to the server’s public HTTPS address instead of ngrok. Microsoft Graph requires a publicly reachable HTTPS webhook for change notifications. [Microsoft Graph webhook delivery guide](https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks)

## Step 3 — Graph Validates the Webhook

Before creating a subscription, Microsoft Graph checks that the notification URL is reachable.

It sends a request to the webhook with a `validationToken` query parameter. The application must return that token as plain text with an HTTP `200 OK` response. If the endpoint returns a 404, or responds in the wrong format, Graph rejects the subscription.

The route handles that validation request separately from normal notifications:

```python
@app.post("/notifications")
async def receive_notification(request: Request):
    validation_token = request.query_params.get("validationToken")

    if validation_token is not None:
        return PlainTextResponse(validation_token, status_code=200)

    # Normal notifications are handled below.
```

This explained one of the errors I saw while setting things up. Graph reported that the “Notification endpoint must respond with 200 OK.” The endpoint path was either unavailable or did not match the URL in my configuration.

Once the ngrok URL, HTTPS scheme, and `/notifications` path all matched, the validation request appeared in my server logs and returned `200 OK`.

## Step 4 — Creating an Inbox Subscription

After the webhook passed validation, the app created a Microsoft Graph subscription for new messages in the inbox.

The subscription describes what Graph should watch and where it should send notifications:

```python
subscription = {
    "changeType": "created",
    "notificationUrl": notification_url,
    "resource": "/me/mailFolders('inbox')/messages",
    "expirationDateTime": expiration_time,
    "clientState": client_state,
}
```

I used `changeType: "created"` because I wanted to react to new messages. The `clientState` value is a random secret that my application also knows. When a notification arrives, the app checks this value before accepting it.

The subscription is not permanent. Outlook message subscriptions have a limited lifetime, so my app requests a six-day expiration and renews the subscription regularly while it is running. [Microsoft Graph subscription resource](https://learn.microsoft.com/en-us/graph/api/resources/subscription?view=graph-rest-1.0)

## Step 5 — Accepting Notifications Without Doing All the Work in the Webhook

When Graph sends a normal notification, it includes the message ID and the subscription’s `clientState`. My endpoint verifies the notification and puts the message ID into a SQLite queue.

The endpoint acknowledges the notification promptly. A background worker handles the slower work: contacting Graph, downloading attachments, extracting text, and calling the summarization model.

```text
Graph sends notification
        │
        ▼
Check clientState and event type
        │
        ▼
Write message ID to SQLite
        │
        ▼
Return HTTP 202
        │
        ▼
Background worker fetches email
```

Keeping the webhook quick was important. If the endpoint tried to fetch the whole email and summarize it before responding, the request would take longer and be harder to recover from if Graph retried the notification.

The SQLite queue also lets the worker retry a failed message instead of losing it immediately. Duplicate notifications for the same message are coalesced in the queue.

## Step 6 — Fetching the Email and Its Attachments

The notification tells my application which message changed. The app then requests the full message and its attachments from Graph:

```python
message_request = graph_client.me.messages.by_message_id(message_id)
message = await message_request.get()

attachment_response = await message_request.attachments.get()
attachments = attachment_response.value or []
```

The attachment request can return more than one page, so the application follows the next-page link when one is present.

The app saves each email in its own folder under `mail_archive`. The folder contains the readable email body, the original attachments, and a summary when the message matches the criteria I want to track.

For example:

```text
mail_archive/
└── Project_update_a1b2c3d4.../
    ├── email_body.txt
    ├── project-details.pdf
    └── summary.md
```

For HTML messages, it saves both readable text and the original HTML. If an attachment is a cloud reference or the application cannot extract readable text from it, the folder includes an `attachments.txt` note explaining that.

## Step 7 — Finding and Summarizing Relevant Emails

My goal was not just to save every message. I wanted the application to identify messages that matter to my work and summarize the useful information.

I wired the application to send the email body and extracted attachment text to Claude Sonnet through OpenRouter. Once the API key is configured, the model checks whether the message matches the criteria I care about and summarizes it. A useful summary can include:

- Who sent the message and what it is about
- The key points from the body and attachments
- Important dates or deadlines
- Decisions, requests, and action items
- Details that are missing or unclear

If the message does not match those criteria, the app still saves the email and attachments but does not create a `summary.md`.

I configured the model and key in `.env`:

```env
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=~anthropic/claude-sonnet-latest
ATTACHMENT_DIRECTORY=mail_archive
```

OpenRouter supports an OpenAI-compatible API, and its documentation lists the latest Claude Sonnet alias. [OpenRouter quickstart](https://openrouter.ai/docs/quickstart) The original attachment files stay on my server; the email body and readable attachment text are sent to OpenRouter for analysis.

## Step 8 — Testing the Complete Flow

I started ngrok in one PowerShell window:

```powershell
ngrok http 8000
```

Then I updated `NOTIFICATION_URL` in `.env` to use the current ngrok HTTPS address, followed by `/notifications`.

In another window, I started the application:

```powershell
python main.py
```

After signing in and seeing the subscription created, I sent a test email to the monitored inbox. The expected flow was:

```text
New email arrives
    ↓
Graph calls /notifications
    ↓
App queues the message ID
    ↓
Worker fetches the body and attachments
    ↓
App saves the source files
    ↓
Claude checks whether the email is relevant
    ↓
Relevant email gets summary.md
```

The ngrok window also helped me see whether Microsoft Graph was reaching my computer. The application logs showed the validation request and the subscription creation.

## What I Learned

The most important lessons were:

1. **A webhook must be publicly reachable.** `localhost` is not enough for Microsoft Graph. Ngrok provided an HTTPS address for testing.
2. **The URL path must match exactly.** My notification URL needed to end in `/notifications`.
3. **Graph validates the endpoint before subscribing.** Returning the validation token as plain text with `200 OK` is part of creating the subscription.
4. **The notification is only the trigger.** My application still needs to fetch the message body and attachments from Graph.
5. **The subscription must be renewed.** It expires, so the application has to keep renewing it.
6. **The server and tunnel must stay online.** The SQLite queue protects notifications the app has accepted, but it cannot queue a notification that never reached the server.

## Wrapping Up

My first post connected Python to my mailbox through Microsoft Entra ID and Microsoft Graph. This next step made the mailbox event-driven: instead of repeatedly checking for new messages, Graph now calls my webhook when a message arrives.

From there, the application can fetch the full email, save the body and attachments, and use Claude Sonnet to identify and summarize messages that match my criteria.

The architecture now looks like this:

```text
Microsoft Entra ID
        │
        ▼
Microsoft Graph and inbox subscription
        │
        ▼
FastAPI webhook exposed through HTTPS
        │
        ▼
SQLite queue and background worker
        │
        ├── Email body and attachments
        └── OpenRouter / Claude Sonnet
                    │
                    ▼
             Email summary
```

The next step is to keep the service running on a server with a stable public HTTPS address, then test it with real messages and attachments.

### Further reading

- [Microsoft Graph change notifications](https://learn.microsoft.com/en-us/graph/change-notifications-overview)
- [Microsoft Graph webhook delivery](https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks)
- [Microsoft Graph message attachments](https://learn.microsoft.com/en-us/graph/api/message-list-attachments?view=graph-rest-1.0)
- [OpenRouter quickstart](https://openrouter.ai/docs/quickstart)
