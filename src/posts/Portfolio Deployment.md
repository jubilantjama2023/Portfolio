---
title: "Deploying on AWS with S3, CloudFront, ACM and GoDaddy"
date: "2026-07-14"
tag: "Deployment"
category: "Deployment"
excerpt: "From Localhost to Production: Deploying My React Portfolio on AWS with S3, CloudFront, ACM and GoDaddy"
---

When I first built my portfolio, it worked perfectly on localhost. The next challenge was making it accessible to the world.

## My goals were:

- Host my portfolio on AWS
- Use my own custom domain
- Secure it with HTTPS
- Keep infrastructure costs low
- Prepare for CI/CD with GitHub Actions

The final architecture looks like this:

```text
Visitor
   │
   ▼
GoDaddy DNS
   │
   ▼
CloudFront
   │
   ▼
Origin Access Control (OAC)
   │
   ▼
Amazon S3 Bucket (Private)
```

## Step 1 — Buying a Domain

I purchased

```
jubilantchikukwa.com
```

through GoDaddy.

Why?

Instead of sharing

```
https://dxxxxxxxx.cloudfront.net
```

I wanted

```
https://jubilantchikukwa.com
```

A custom domain looks more professional on:

- LinkedIn
- Resume
- GitHub
- Job applications

## Step 2 — Why AWS?

I chose AWS because:

- scalable
- highly available
- industry standard
- services integrate well together

For a static React portfolio, AWS provides everything needed without running servers.

## Step 3 — Building the React App

Since my portfolio was built with Vite:

```bash
npm install
npm run build
```

This generated

```
dist/
```

containing:

```
index.html
assets/
images/
css/
js/
```

These static files are what browsers actually need.

## Step 4 — Creating an IAM User

Instead of using my AWS root account everywhere, I created an IAM deployment user.

Why?

AWS recommends never using the root account for everyday work.

The deployment user:

- uploads files
- accesses S3
- will later be used by GitHub Actions

This follows the principle of least privilege.

## Step 5 — Creating Access Keys

I generated

- Access Key ID
- Secret Access Key

Why?

GitHub Actions cannot log into AWS using a username and password.

Instead it authenticates using API credentials.

These credentials will later become GitHub Secrets.

## Step 6 — Creating the S3 Bucket

Bucket name

```
jubilantchikukwa.com
```

Why S3?

Amazon S3 is object storage.

Unlike EC2, it doesn't run servers.

It simply stores:

```
index.html
css
javascript
images
fonts
```

making it perfect for React portfolios.

## Step 7 — Uploading the Website

I uploaded the contents of

```
dist/
```

instead of uploading the entire folder.

Correct:

```
index.html
assets/
favicon.svg
```

Incorrect:

```
dist/
    index.html
```

This mistake caused my website not to load initially.

## Step 8 — Why CloudFront?

Initially I considered hosting directly from S3.

The problem:

S3 Static Website Hosting only supports

```
HTTP
```

I wanted

```
HTTPS
```

CloudFront solved that problem.

CloudFront provides:

- HTTPS
- caching
- faster loading worldwide
- CDN
- better security

## Step 9 — Requesting an SSL Certificate with AWS Certificate Manager (ACM)

At this point my website files were stored in Amazon S3, but there was one problem.

Amazon S3 Static Website Hosting only serves websites over HTTP, while I wanted my portfolio to be accessible securely using HTTPS.

For HTTPS to work, a website needs an SSL/TLS certificate.

AWS provides these certificates free of charge through AWS Certificate Manager (ACM).

One thing I learned is that because I was using CloudFront, the certificate had to be created in the `us-east-1` (N. Virginia) region, even though my S3 bucket was in `eu-north-1` (Stockholm).

This is a CloudFront requirement.

**Certificate Details**

I requested a Public Certificate for:

- `jubilantchikukwa.com`
- `www.jubilantchikukwa.com`

Adding both domains meant visitors could access my website using either:

```
https://jubilantchikukwa.com
```

or

```
https://www.jubilantchikukwa.com
```

## Step 10 — DNS Validation with GoDaddy

AWS needs proof that you actually own the domain before issuing the certificate.

Instead of asking me to upload a file to my website, ACM generated CNAME DNS records.

The records looked similar to this:

**Record 1**
- Type: `CNAME`
- Name: `_[redacted].jubilantchikukwa.com.`
- Value: `_[redacted].acm-validations.aws.`

**Record 2**
- Type: `CNAME`
- Name: `_[redacted].www.jubilantchikukwa.com.`
- Value: `_[redacted].acm-validations.aws.`

**Updating GoDaddy**

Inside GoDaddy I opened:

```
My Products → DNS Management
```

Then I added two new CNAME records.

One thing that initially confused me was GoDaddy's Name and Value fields.

AWS displays the full domain name, but GoDaddy automatically appends your domain.

For example, ACM gave me a Name in the form:

```
_[redacted].jubilantchikukwa.com.
```

In GoDaddy I entered only the redacted portion before the domain, because GoDaddy automatically adds `.jubilantchikukwa.com`.

For the **Value** field, I copied the ACM value exactly as AWS provided it — a long string ending in `.acm-validations.aws.`.

I repeated the process for the second CNAME record used to validate the `www` subdomain.

**Waiting for Validation**

Initially, ACM displayed:

```
Pending Validation
```

This wasn't an error.

AWS was waiting for the DNS changes to propagate across the internet.

Once ACM detected the DNS records, the certificate status automatically changed to:

```
Issued
```

At that point, the SSL certificate was ready to be used by CloudFront.

## Step 11 — Creating the CloudFront Distribution

CloudFront sits between users and the S3 bucket.

Instead of visitors downloading files directly from S3, CloudFront serves the files.

```text
Browser
      │
      ▼
CloudFront
      │
      ▼
Amazon S3
```

This provides:

- HTTPS
- Better performance
- Global caching
- Improved security

**Origin Configuration**

When creating the distribution I selected:

**Origin Domain**
```
jubilantchikukwa.com.s3.eu-north-1.amazonaws.com
```

I deliberately selected the S3 bucket endpoint, not the Static Website Hosting endpoint.

Why?

Using the bucket endpoint allows CloudFront to use Origin Access Control (OAC), which keeps the bucket private.

**Default Root Object**

I configured:

```
index.html
```

This tells CloudFront that when someone visits `https://jubilantchikukwa.com`, it should automatically serve `index.html` instead of expecting the visitor to type `https://jubilantchikukwa.com/index.html`.

**Viewer Protocol Policy**

I selected:

```
Redirect HTTP to HTTPS
```

This ensures that anyone visiting `http://jubilantchikukwa.com` is automatically redirected to `https://jubilantchikukwa.com`.

**Alternate Domain Names (CNAMEs)**

Instead of exposing the CloudFront URL:

```
https://dxxxxxxxx.cloudfront.net
```

I added my own domains:

- `jubilantchikukwa.com`
- `www.jubilantchikukwa.com`

This tells CloudFront which custom domains it should answer for.

**SSL Certificate**

Under Custom SSL Certificate, I selected the ACM certificate that had just been issued.

Without attaching this certificate, CloudFront would not be able to serve my custom domain over HTTPS.

## Step 12 — Updating the S3 Bucket Policy

During CloudFront distribution creation, AWS automatically created an Origin Access Control (OAC) because the recommended origin access settings were selected. The OAC was automatically attached to the S3 origin, allowing CloudFront to securely access the bucket without making it public.

After creating the CloudFront distribution, my website still wasn't loading.

The reason was that although CloudFront was configured to use my S3 bucket as its origin, Amazon S3 didn't yet trust CloudFront to read the files.

By default, my bucket was private, and I wanted to keep it that way. Instead of making the bucket public, I granted permission only to my CloudFront distribution.

CloudFront generated a bucket policy similar to the following:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jubilantchikukwa.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT-ID>:distribution/<DISTRIBUTION-ID>"
        }
      }
    }
  ]
}
```

I copied this policy into:

```text
Amazon S3
    ↓
Bucket
    ↓
Permissions
    ↓
Bucket Policy
```

This policy allows only my CloudFront distribution to retrieve objects from the bucket. Any attempt to access the bucket directly from the internet is denied.

Without this policy, CloudFront returned a `403 Access Denied` error because Amazon S3 rejected its requests.

## Step 13 — Updating GoDaddy DNS

The ACM validation records proved I owned the domain, but they did not make the domain point to my website.

That required updating the DNS again.

**Updating the www Record**

Originally, GoDaddy had:

- Type: `CNAME`
- Name: `www`
- Points To: `jubilantchikukwa.com`

I edited it to:

- Type: `CNAME`
- Name: `www`
- Points To: `[your-distribution-id].cloudfront.net`

This tells browsers that requests for `www.jubilantchikukwa.com` should be sent to CloudFront.

**Root Domain**

GoDaddy does not allow a root domain (`@`) to point directly to CloudFront using a CNAME.

To work around this limitation, I configured GoDaddy domain forwarding.

```text
jubilantchikukwa.com
            │
            ▼
www.jubilantchikukwa.com
            │
            ▼
CloudFront
            │
            ▼
Amazon S3
```

This meant both `https://jubilantchikukwa.com` and `https://www.jubilantchikukwa.com` would ultimately reach the same website.

## Wrapping Up

Going from `npm run build` to a live, HTTPS-secured custom domain touched almost every layer of AWS's edge infrastructure: an IAM user for least-privilege access, S3 for storage, ACM for certificates, CloudFront for the CDN and TLS termination, and GoDaddy for DNS. None of these steps were individually hard, but the details — regions that had to match CloudFront's requirements, GoDaddy's Name vs. Value quirks, and OAC's bucket policy — were exactly the kind of thing that's easy to get stuck on and hard to find written down clearly.

The next step is wiring this up to GitHub Actions so every push to `main` triggers a fresh build and sync to S3, with a CloudFront cache invalidation to match, using the access keys created in Step 5. That's a post for another day.
