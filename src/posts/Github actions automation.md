---
title: "Using GitHub Actions to deploy to S3 and CloudFront"
date: "2026-07-21"
tag: "Automation"
excerpt: "From Manual Uploads to One Push: Automating My React Portfolio Deploy with GitHub Actions"
---

Once my portfolio was live on AWS, a new problem showed up. Every small change meant repeating the same manual routine: build locally, sync to S3, remember to invalidate CloudFront. It worked, but it was easy to forget a step — and easy to get lazy about shipping small fixes because of the friction.

## My goals were:

- Deploy automatically on every push to `main`
- Never touch AWS credentials on my own machine again
- Keep the whole pipeline in one readable file
- Make sure the CDN cache never serves a stale build

The pipeline looks like this:

```text
Push to main
      │
      ▼
GitHub Actions
      │
      ▼
Build (npm install + npm run build)
      │
      ▼
Upload to S3
      │
      ▼
Invalidate CloudFront cache
      │
      ▼
Live at jubilantchikukwa.com
```

## Step 1 — Why GitHub Actions

I was already hosting the repo on GitHub, so GitHub Actions meant no new service to sign up for, no separate CI tool to configure, and secrets that live in the same place as the code they deploy.

The alternative was staying with my manual routine — build, sync, invalidate, by hand, every time. That works right up until the day you forget the invalidation step and wonder why nobody can see your fix.

## Step 2 — Where the Workflow File Lives

GitHub only looks in one place for workflows:

```
your-repo/
  .github/
    workflows/
      deploy.yml
```

Both `.github/` and `workflows/` have to be named exactly that — GitHub scans this folder on every push. The filename itself is flexible; I called mine `deploy.yml` but `ci.yml` or `main.yml` would work identically, as long as it ends in `.yml` or `.yaml`.

## Step 3 — Setting the Trigger

```yaml
on:
  push:
    branches:
      - main
```

`on:` defines the trigger — what causes the workflow to run at all. I only wanted this firing on pushes to `main`, not on every branch. GitHub Actions supports other triggers too: `schedule` (cron-style, for anything that should run on a timer), `pull_request`, or `workflow_dispatch`, which adds a manual "Run workflow" button in the Actions tab.

## Step 4 — Choosing the Runner

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
```

A job is a group of steps that run together on one machine. `deploy` is just a label I chose — GitHub doesn't care what it's called, though it does show up in the Actions tab and in any `needs:` references from other jobs later.

`runs-on: ubuntu-latest` is the actual machine: a brand new Ubuntu virtual machine, spun up fresh for this run and thrown away afterward. Nothing persists between runs unless I explicitly cache it.

## Step 5 — Checking Out the Code

```yaml
- name: Checkout Repository
  uses: actions/checkout@v4
```

The runner starts empty. This step pulls my repository onto it. Without it, every later step would be building nothing.

## Step 6 — Setting Up Node

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 22
```

Installs Node.js on the runner so `npm` commands actually work. I pinned it to version 22 to match what I use locally — mismatched Node versions between local and CI is a classic source of "works on my machine" bugs.

## Step 7 — Installing Dependencies and Building

```yaml
- name: Install Dependencies
  run: npm install

- name: Build Project
  run: npm run build
```

Same two commands I used to run by hand. `npm install` reads `package.json` and installs everything the project needs. `npm run build` compiles the React app into static files, output into a `dist/` folder — the only thing the next steps actually care about.

## Step 8 — Storing AWS Credentials Safely

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ${{ secrets.AWS_REGION }}
```

The `${{ secrets.* }}` values aren't in this file at all — they're encrypted values I added under the repo's Settings → Secrets, pulled in only at runtime. This is the whole reason I set up the IAM deployment user earlier instead of using root credentials: this workflow only has the S3 and CloudFront permissions it actually needs.

## Step 9 — Uploading to S3

```yaml
- name: Upload to S3
  run: aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
```

`aws s3 sync` uploads the new `dist/` folder to the bucket. The `--delete` flag matters — without it, old files from previous builds would just pile up in the bucket forever instead of being cleaned up.

## Step 10 — Invalidating the CloudFront Cache

```yaml
- name: Invalidate CloudFront Cache
  run: |
    aws cloudfront create-invalidation \
    --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
    --paths "/*"
```

This is the step I used to forget manually. CloudFront caches aggressively for performance, so uploading a new file to S3 isn't enough on its own — without telling CloudFront to drop its cached copy, visitors could keep seeing the old version for hours.

## Wrapping Up

The full file ties all of this together in one place:

```yaml
name: Deploy Portfolio

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Upload to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

Nine lines of manual steps became one `git push`. The pipeline is slower than running the commands locally — a full run takes a couple of minutes — but it's consistent every single time, and it means I can ship a small fix from my phone if I have to, without ever touching an AWS credential directly.