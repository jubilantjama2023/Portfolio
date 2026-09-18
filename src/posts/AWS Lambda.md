---
title: "Building a Serverless Legal Document Processing Pipeline with AWS Lambda"
date: "2026-09-18"
tag: "AWS Lambda"
category: "Backend"
excerpt: "How I built a serverless legal document processing pipeline using AWS Lambda, S3, SQS, PyMuPDF, LangGraph and DynamoDB."
---

# Building a Serverless Legal Document Processing Pipeline with AWS Lambda

> **Backend Engineering Journal**

## Introduction

I wanted to build a backend system that could take a legal document, process it asynchronously, use AI to understand the document, and store the result for later use.

Instead of building the entire application as one large backend service, I decided to break the workflow into smaller services using AWS serverless components.

The result is a document-processing pipeline built around:

- Amazon API Gateway
- AWS Lambda
- Amazon S3
- Amazon SQS
- Amazon DynamoDB
- PyMuPDF
- LangGraph
- OpenRouter
- Python
- React/Vite

The pipeline now takes a PDF from upload all the way through AI processing and stores the processed result in DynamoDB.

## What I Have Built So Far

The overall workflow looks like this:

```text
React/Vite
    |
    v
API Gateway
    |
    v
Lambda 1
    |
    v
S3
    |
    v
SQS
    |
    v
Lambda 3
    |
    v
PyMuPDF
    |
    v
LangGraph
    |
    v
DynamoDB
```

The important part is that the document-processing work is asynchronous. The upload does not need to wait for the AI processing to finish.

## Step 1 - Start With the Upload API

The first part of the system is an API endpoint responsible for starting a document upload.

The frontend sends a request to API Gateway.

```text
React/Vite
    |
    v
API Gateway
    |
    v
Lambda
```

The Lambda function creates a unique `documentId` that can be used to track the document through the rest of the pipeline.

## Step 2 - Create a Document ID

Each uploaded document needs a unique identifier.

I use the ID to create an S3 key such as:

```text
documents/{documentId}/{filename}
```

For example:

```text
documents/12345/employment-contract.pdf
```

This gives each document its own identifiable location in S3.

## Step 3 - Generate a Presigned S3 URL

Instead of sending the entire PDF through Lambda, Lambda generates a presigned S3 URL.

The frontend can then upload the file directly to S3.

```text
React/Vite
    |
    | request upload URL
    v
API Gateway
    |
    v
Lambda
    |
    | generate presigned URL
    v
React/Vite
    |
    | upload PDF
    v
S3
```

The presigned URL is configured with an expiration time of 600 seconds.

This keeps the API responsible for creating the upload authorization without forcing Lambda to handle the file contents itself.

## Step 4 - Store the Document in S3

The uploaded PDF is stored in the S3 bucket:

```text
legal-document-pipeline-dev
```

The bucket is in the `eu-north-1` region.

The object structure follows the pattern:

```text
documents/{documentId}/{filename}
```

At this point the original document is safely stored in object storage.

## Step 5 - Trigger the Processing Pipeline

Once the document has been uploaded, the next challenge is processing it without making the upload request wait for the entire workflow.

This is where asynchronous processing becomes useful.

Instead of doing everything inside the upload Lambda, I introduced Amazon SQS.

```text
S3
 |
 v
SQS
 |
 v
Processing Lambda
```

## Step 6 - Introduce Amazon SQS

Amazon SQS acts as a queue between uploading a document and processing it.

The message contains information about the S3 object that needs to be processed.

Conceptually, the message looks like:

```json
{
  "bucket": "legal-document-pipeline-dev",
  "key": "documents/12345/employment-contract.pdf"
}
```

The queue gives the processing system a buffer between document uploads and document processing.

This also means the processing Lambda can fail or take longer without blocking the original upload operation.

## Step 7 - Read the SQS Message in Lambda

The processing Lambda receives the SQS event and extracts the message body.

One important change I made during development was replacing `eval()` with `json.loads()`.

```python
import json

body = json.loads(record["body"])
```

Using JSON parsing is the appropriate approach when the message is JSON data.

The Lambda can then access the bucket and object key from the message.

## Step 8 - Retrieve the Document From S3

Once Lambda knows which S3 object to process, it downloads the object into memory.

Conceptually:

```text
SQS message
    |
    v
S3 bucket + object key
    |
    v
PDF bytes
```

The PDF is then passed to the document-processing logic.

## Step 9 - Extract Text From the PDF

For PDF processing I used PyMuPDF.

The PDF can be opened directly from the bytes returned by S3:

```python
pdf = fitz.open(stream=content, filetype="pdf")
```

I then loop through the pages and extract their text:

```python
text = ""

for page in pdf:
    text += page.get_text()
```

The result is a text representation of the legal document that can be passed to the AI workflow.

One of the test PDFs I used was approximately 1.53 MB.

## Step 10 - Add LangGraph

Once I had extracted the text, I wanted to introduce an AI workflow rather than making one direct LLM call.

I used LangGraph to structure the processing logic.

The graph currently works with a state containing information such as:

```python
class DocumentState:
    text: str
    document_id: str
    document_type: str
    summary: str
```

The idea is that the document can move through multiple processing steps while sharing a common state.

This gives me a foundation for adding more nodes later.

## Step 11 - Define Document Categories

The first AI task is document classification.

The current categories are:

```text
employment_contract
lease_agreement
nda
court_document
invoice
affidavit
letter
company_document
other
```

The model receives the extracted document text and determines which category best describes the document.

## Step 12 - Connect LangGraph to the LLM

The LangGraph workflow uses LangChain's OpenAI integration to communicate with an LLM through OpenRouter.

The configuration currently uses:

```python
ChatOpenAI(
    model="openai/gpt-4o-mini",
    base_url="https://openrouter.ai/api/v1"
)
```

This lets the application keep the workflow structure in LangGraph while using an OpenAI-compatible API endpoint through OpenRouter.

## Step 13 - Invoke the Graph From Lambda

After extracting the PDF text, Lambda passes the text and document ID into the graph.

```python
result = graph.invoke({
    "text": text,
    "document_id": key
})
```

The graph processes the document and returns the structured result.

During testing, the Lambda successfully returned:

```text
Document processed successfully
```

That confirmed that the core document-processing workflow was working end to end.

## Step 14 - Store the Result in DynamoDB

The processed AI result is now stored in DynamoDB.

This is an important part of the system because the application no longer needs to process the original PDF every time it wants to access the extracted information.

The flow is now:

```text
PDF
 |
 v
S3
 |
 v
SQS
 |
 v
Lambda
 |
 v
PyMuPDF
 |
 v
LangGraph
 |
 v
AI result
 |
 v
DynamoDB
```

DynamoDB becomes the structured data layer for the processed documents.

This also gives the rest of the application a place to retrieve document information without directly reading and processing the original PDF again.

## Step 15 - Package the Python Dependencies

The Lambda function depends on packages that are not included in the default Python runtime.

Some of the dependencies include:

```text
pymupdf
langchain
langgraph
langchain-openai
```

I packaged the dependencies for the Lambda Python 3.14 environment.

One of the lessons here was that packaging serverless applications is part of the engineering work. Getting the code working locally is only one part of deploying it successfully to Lambda.

## Step 16 - Add CloudWatch Logging

I also added CloudWatch logging so that I could see what the Lambda was doing during execution.

The processing logs are available through the CloudWatch log group:

```text
pdfprocessor
```

This became especially useful when testing the SQS event, S3 retrieval, PDF extraction and LangGraph invocation.

## Step 17 - Test the Complete Pipeline

After connecting the different components, I tested the complete workflow.

The flow is:

```text
1. User selects PDF
2. Frontend requests upload URL
3. API Gateway receives request
4. Lambda creates document ID
5. Lambda generates presigned S3 URL
6. Frontend uploads PDF to S3
7. SQS receives processing message
8. Processing Lambda receives SQS event
9. Lambda retrieves PDF from S3
10. PyMuPDF extracts text
11. LangGraph processes the document
12. AI classifies and summarizes the document
13. Result is stored in DynamoDB
14. CloudWatch records execution details
```

The end-to-end pipeline is now working.

## The Current Architecture

The current architecture can be represented as:

```text
                    +----------------+
                    |   React/Vite   |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |  API Gateway   |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |    Lambda 1    |
                    | Upload Handler  |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |       S3       |
                    |   PDF Storage  |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |      SQS       |
                    | Processing     |
                    |     Queue      |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |    Lambda 3    |
                    |   Processor     |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |    PyMuPDF     |
                    |  Text Extract   |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |   LangGraph    |
                    |  AI Workflow   |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    |   DynamoDB     |
                    | Processed Data |
                    +----------------+
```

## Why I Chose This Architecture

I wanted the project to demonstrate more than simply calling an AI API.

The goal was to build a backend system where each component has a clear responsibility.

### API Gateway

Provides the HTTP entry point for the application.

### Lambda

Runs backend logic without requiring a continuously running server.

### S3

Stores the original documents.

### SQS

Separates document uploads from potentially slower processing operations.

### PyMuPDF

Extracts text from PDF documents.

### LangGraph

Provides a structure for building a multi-step AI workflow.

### DynamoDB

Stores the structured output generated by the processing pipeline.

### CloudWatch

Provides logging and visibility into Lambda execution.

## Problems I Encountered

Building the pipeline also exposed several practical problems.

### 1. Handling asynchronous workflows

The document upload and document processing should not be treated as the same operation.

SQS helped separate these responsibilities.

### 2. Lambda dependencies

Libraries such as PyMuPDF and the LangChain ecosystem need to be packaged correctly for the Lambda runtime.

### 3. Passing data between services

Each service needs a predictable contract.

For example, the SQS message needs enough information for the processing Lambda to find the correct S3 object.

### 4. Debugging distributed execution

A request can move through several AWS services before the final result is produced.

CloudWatch logs became important for understanding where something failed.

### 5. Structuring the AI workflow

I did not want the application to become one large function containing PDF extraction, classification, summarization and database logic.

LangGraph gives me a way to break those responsibilities into separate processing steps.

## What I Have Learned

This project has helped me understand several backend concepts more practically.

### Serverless architecture

Lambda changes the way backend services are designed because functions can focus on individual pieces of functionality instead of acting as one large application server.

### Event-driven architecture

SQS introduces an event-driven approach where work can be placed onto a queue and processed separately.

### Object storage

S3 is useful for storing the original files while a database can store the structured information extracted from them.

### AI workflows

LangGraph provides a useful abstraction when an AI application starts becoming more than a single prompt and response.

### Database design

DynamoDB gives the application a persistent structured representation of the processed documents.

### Observability

CloudWatch logging is not an afterthought. It is necessary when multiple serverless services are involved.

## Next Steps

Now that the core pipeline is working and the processed result is stored in DynamoDB, the next improvements are focused on making the information more useful to the application.

Some of the next features I want to explore are:

- Extracting important dates from legal documents
- Identifying parties and organisations
- Extracting obligations and responsibilities
- Detecting important clauses
- Improving document classification
- Adding additional LangGraph processing nodes
- Creating an API for retrieving processed documents
- Adding notifications or email alerts for important deadlines
- Improving error handling and retries
- Adding more detailed CloudWatch monitoring
- Building a frontend for viewing processed documents

The architecture is intentionally designed so that these features can be added without rebuilding the entire pipeline.

## Final Thoughts

What started as a simple idea of uploading a PDF has turned into a practical backend engineering project involving several AWS services and an AI workflow.

The most useful part for me has been seeing how the individual pieces connect.

A PDF is uploaded to S3. A queue decouples the processing. Lambda retrieves the document. PyMuPDF extracts the text. LangGraph coordinates the AI workflow. The processed result is stored in DynamoDB. CloudWatch provides visibility into the execution.

```text
Upload
  -> Store
  -> Queue
  -> Process
  -> Understand
  -> Store Result
```

The project has given me hands-on experience with serverless architecture, asynchronous processing, cloud storage, event-driven systems, AI workflows and NoSQL data storage.

More importantly, it gives me a foundation that can be extended into a real legal document-processing application rather than remaining a simple AI demo.

## Project Stack

```text
Frontend:
React / Vite

API:
Amazon API Gateway

Compute:
AWS Lambda
Python 3.14

Storage:
Amazon S3
Amazon DynamoDB

Messaging:
Amazon SQS

PDF Processing:
PyMuPDF

AI Workflow:
LangGraph
LangChain
OpenRouter

Observability:
Amazon CloudWatch
```