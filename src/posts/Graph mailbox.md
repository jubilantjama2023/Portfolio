---

title: "Connecting My Mailbox to Microsoft Graph with Python"
date: "2026-08-28"
tag: "Microsoft Graph"
category: "Integration"
excerpt: "Connecting a Python application to my Microsoft mailbox using Microsoft Graph, Azure Identity and OAuth authentication."
----------------------------------------------------------------------------------------------------------------------------------

After getting my portfolio deployed on AWS, I wanted to work on something different: connecting an application directly to my mailbox.

The goal was to build a Python application that could authenticate with my Microsoft account and interact with my mailbox using Microsoft Graph.

Eventually, I want to use this connection as part of an agent that can work with emails programmatically.

The architecture is relatively simple:

```text
Python Application
       │
       ▼
Microsoft Entra ID
       │
       ▼
OAuth Authentication
       │
       ▼
Microsoft Graph API
       │
       ▼
Microsoft Mailbox
```

But getting the authentication working was where most of the learning happened.

## Step 1 — What I Wanted to Build

My initial goal was straightforward:

* Connect Python to my Microsoft mailbox
* Authenticate securely using Microsoft Entra ID
* Use Microsoft Graph to access mailbox data
* Avoid storing my Microsoft password in the application
* Eventually use the connection inside an AI agent

I decided to use:

* Python
* Microsoft Graph
* Azure Identity
* Microsoft Entra ID
* OAuth 2.0
* `.env` for configuration

The first thing I needed was an application registration in Microsoft Entra ID.

## Step 2 — Registering the Application

Microsoft Graph needs to know which application is requesting access to the mailbox.

I created an application registration in Microsoft Entra ID.

The application registration gave me two important values:

```text
Tenant ID
Client ID
```

I stored these in my `.env` file:

```text
TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

I deliberately kept these values outside my Python code so that configuration wasn't hardcoded into the application.

## Step 3 — Adding Microsoft Graph Permissions

Creating the application registration wasn't enough.

The application also needed permission to interact with Microsoft Graph.

I added the Microsoft Graph permissions required by the application.

This is where Microsoft Graph's permission model became important.

The application doesn't automatically get access to someone's mailbox just because an app registration exists.

The application must request the appropriate permissions, and the user must authenticate and consent where required.

The general flow is:

```text
Application
     │
     ▼
Requests Graph permissions
     │
     ▼
User signs in
     │
     ▼
User grants consent
     │
     ▼
Microsoft Graph access token
```

## Step 4 — Installing the Python Packages

I created a virtual environment and installed the libraries I needed.

```bash
pip install azure-identity msgraph-sdk python-dotenv
```

The main libraries were:

```text
azure-identity
msgraph-sdk
python-dotenv
```

`azure-identity` handles authentication.

`msgraph-sdk` provides the Microsoft Graph client.

`python-dotenv` allows me to load configuration from my `.env` file.

## Step 5 — Creating the Authentication Code

I started with `InteractiveBrowserCredential`.

The idea is that my Python application opens a browser and allows me to sign into my Microsoft account.

The basic setup looked like this:

```python
import os

from azure.identity import InteractiveBrowserCredential
from dotenv import load_dotenv

load_dotenv()

TENANT_ID = os.getenv("TENANT_ID")
CLIENT_ID = os.getenv("CLIENT_ID")

credential = InteractiveBrowserCredential(
    tenant_id=TENANT_ID,
    client_id=CLIENT_ID,
)
```

This was my first real step toward connecting Python to my Microsoft account.

Instead of asking my application to handle my password, the authentication happens through Microsoft's login experience.

## Step 6 — Connecting to Microsoft Graph

Once I had the credential, I could create the Graph client.

```python
from msgraph import GraphServiceClient

scopes = [
    "Mail.Read"
]

credential = InteractiveBrowserCredential(
    tenant_id=TENANT_ID,
    client_id=CLIENT_ID,
)

graph_client = GraphServiceClient(
    credentials=credential,
    scopes=scopes,
)
```

The architecture was now:

```text
Python
  │
  ▼
InteractiveBrowserCredential
  │
  ▼
Microsoft Entra ID
  │
  ▼
Access Token
  │
  ▼
Microsoft Graph
  │
  ▼
Mailbox
```

At this point I expected the browser authentication to simply work.

It didn't.

## Step 7 — The Localhost Problem

One of the first errors I ran into was related to the browser authentication callback.

My application was running locally.

```text
localhost
```

When I authenticated, Microsoft needed somewhere to redirect the browser after login.

This is where I learned about redirect URIs.

My application wasn't running on a public website.

It was running on my local machine.

So the authentication flow needed to know where the browser should return after authentication.

Initially, this wasn't configured correctly.

The result was that authentication didn't complete the way I expected.

## Step 8 — Why I Had to Specify a Port

This was one of the confusing parts.

`localhost` by itself isn't enough.

A local application normally listens on a specific port.

For example:

```text
http://localhost:8000
```

or:

```text
http://localhost:8080
```

The port is effectively part of the address of the local application.

So:

```text
http://localhost
```

and:

```text
http://localhost:8000
```

aren't the same redirect URI.

I initially didn't fully appreciate this.

Once I configured the application and authentication flow around the correct localhost port, the browser could return to the application after authentication.

This was a good reminder that authentication isn't just:

```text
Login → Done
```

There is an entire redirect flow happening behind the scenes.

## Step 9 — The Authentication Timeout

After fixing the localhost configuration, I ran the application again.

Instead of successfully authenticating, I eventually received:

```text
ClientAuthenticationError:
Timed out after waiting 300 seconds for the user to authenticate
```

This was another useful lesson.

The error didn't necessarily mean that my Microsoft account was wrong.

It meant that the authentication flow was waiting for the browser login to complete, but the application never received the expected authentication response within the timeout period.

So I had to look at the entire authentication flow instead of assuming the problem was my username or password.

```text
Python Application
       │
       ▼
Browser opens
       │
       ▼
Microsoft Login
       │
       ▼
Authentication
       │
       ▼
Redirect back to localhost
       │
       ▼
Python receives authentication result
```

If something goes wrong between those steps, the Python process can simply sit there waiting until the timeout is reached.

## Step 10 — Adding Token Caching

Once authentication was working, I didn't want to repeatedly go through the login process every time I ran my script.

That's where token caching became useful.

I used:

```python
from azure.identity import TokenCachePersistenceOptions
```

and configured persistent token caching.

The idea is that authentication tokens can be persisted locally so that the application can reuse them when possible.

Conceptually:

```text
First run
    │
    ▼
Browser login
    │
    ▼
Token
    │
    ▼
Token cache

Later runs
    │
    ▼
Check cache
    │
    ├── Valid token → Use it
    │
    └── No valid token → Authenticate again
```

This made development much more convenient.

It also helped me understand the difference between authentication and simply logging in every time the program runs.

## Step 11 — Testing the Mailbox

With authentication working, the next step was to actually call Microsoft Graph.

For example, I could request messages from the mailbox.

The important thing here is that Python isn't directly connecting to the mailbox server.

Instead, the flow is:

```text
Python
   │
   ▼
Microsoft Graph SDK
   │
   ▼
Microsoft Graph API
   │
   ▼
Microsoft 365
   │
   ▼
Mailbox
```

This is what makes Microsoft Graph useful.

The application can interact with Microsoft 365 services through a consistent API rather than implementing the underlying mail protocols itself.

## Step 12 — Still Being Asked to Sign In

Even with `TokenCachePersistenceOptions` in place, I noticed something odd: I was still being sent through a "Pick an account" screen on every run.

It wasn't a full login. There was no password prompt, no MFA. Just a browser window popping up asking me to choose my account and click through, every single time.

At first I assumed the cache wasn't being written at all. I checked the actual cache location on Windows:

```powershell
dir $env:LOCALAPPDATA\.IdentityService\
```

The cache file was there, and it was being updated on each run. So the token cache itself was working fine. The problem was something else: `InteractiveBrowserCredential` had no way of knowing *which* cached identity to reuse. Setting `cache_persistence_options` tells it where to store tokens, but it doesn't tell the credential which account in that cache belongs to me.

The missing piece turned out to be an `AuthenticationRecord`. It's a small JSON object (home account ID, tenant ID, username) that gets created the first time I authenticate. If I save that record and pass it back into the credential on the next run, it can look up the matching entry in the token cache and try to reuse it silently, before ever opening a browser.

```text
First run
    │
    ▼
credential.authenticate()
    │
    ▼
AuthenticationRecord
    │
    ▼
Saved to disk (auth_record.json)

Later runs
    │
    ▼
Load AuthenticationRecord
    │
    ▼
Pass into InteractiveBrowserCredential
    │
    ▼
Credential finds matching cached account
    │
    ▼
Silent token reuse → no browser window
```

Here's the updated authentication setup:

```python
import os
from azure.identity import (
    InteractiveBrowserCredential,
    TokenCachePersistenceOptions,
    AuthenticationRecord,
)
from dotenv import load_dotenv

load_dotenv()

TENANT_ID = os.getenv("TENANT_ID")
CLIENT_ID = os.getenv("CLIENT_ID")

cache_options = TokenCachePersistenceOptions(name="tender-agent")
RECORD_PATH = "auth_record.json"

# Load a previously saved auth record, if one exists
auth_record = None
if os.path.exists(RECORD_PATH):
    with open(RECORD_PATH, "r") as f:
        auth_record = AuthenticationRecord.deserialize(f.read())

credential = InteractiveBrowserCredential(
    tenant_id=TENANT_ID,
    client_id=CLIENT_ID,
    redirect_uri="http://localhost:8400",
    cache_persistence_options=cache_options,
    authentication_record=auth_record,
)

# First run only: authenticate once and save the record
if auth_record is None:
    record = credential.authenticate(scopes=["Mail.Read"])
    with open(RECORD_PATH, "w") as f:
        f.write(record.serialize())
```

Once this was in place, subsequent runs went straight through without any browser window at all. `auth_record.json` doesn't contain any tokens itself, but I still keep it out of version control alongside the token cache, since it does identify the account being used.

## Step 13 — What Went Wrong

This was probably the most useful part of the process.

The code itself wasn't particularly complicated.

The difficult part was understanding all the pieces around authentication.

The main problems I encountered were:

### 1. Localhost wasn't enough

The browser authentication flow needed the correct local redirect configuration.

### 2. The port mattered

```text
localhost
```

wasn't equivalent to:

```text
localhost:<port>
```

The application needed to know exactly where to return the authentication response.

### 3. Authentication could time out

I received:

```text
Timed out after waiting 300 seconds for the user to authenticate
```

This made me realise that an authentication timeout can be a symptom of the redirect flow not completing rather than simply an incorrect password.

### 4. Authentication and API access are separate problems

Getting an access token doesn't automatically mean the application can perform every Microsoft Graph operation.

The application still needs the appropriate Graph permissions.

### 5. Token caching matters, but it isn't the whole story

Caching tokens to disk stops the *timeout* problem, but it doesn't stop the "Pick an account" prompt on its own. `InteractiveBrowserCredential` needs an `AuthenticationRecord` to know which cached identity to reuse silently.

## What I Learned

The biggest lesson was that integrating with Microsoft services isn't just about installing an SDK and calling an API.

There are several layers involved:

```text
Application
     │
     ▼
App Registration
     │
     ▼
Permissions
     │
     ▼
Authentication
     │
     ▼
OAuth Token
     │
     ▼
Microsoft Graph
     │
     ▼
Mailbox
```

Understanding this flow made the errors much easier to reason about.

I also got a better understanding of why OAuth applications use redirect URIs, why something as small as a localhost port can prevent authentication from completing, and why persisting tokens to disk isn't the same as telling a credential which identity to reuse.

## Wrapping Up

Connecting my Python application to my mailbox turned out to be less about writing a lot of code and more about understanding authentication.

I started with:

```text
Python
```

and ended up working with:

```text
Python
   ↓
Azure Identity
   ↓
Microsoft Entra ID
   ↓
OAuth
   ↓
Microsoft Graph
   ↓
Microsoft Mailbox
```

The next step is to build on this connection.

Instead of simply reading emails, I want to expose mailbox operations as tools that an AI agent can use.

For example:

```text
User
 │
 ▼
AI Agent
 │
 ├── Search emails
 ├── Read email
 ├── Find attachments
 └── Draft a response
       │
       ▼
Microsoft Graph
       │
       ▼
Mailbox
```

That is where this simple mailbox connection starts becoming an actual automation project.