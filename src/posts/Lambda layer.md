---
title: "Packaging Python Dependencies for AWS Lambda with Layers"
date: "2026-09-18"
tag: "AWS Lambda"
category: "Backend"
excerpt: "How I packaged PyMuPDF, LangGraph and LangChain into a Lambda layer using a Lambda-compatible container image, then published and attached it through the AWS Console."
---

# Packaging Python Dependencies for AWS Lambda with Layers

> **Backend Engineering Journal**

## Adding Dependencies to the Lambda Function

One of the challenges with this Lambda function was that the application depended on Python packages that are not included in the standard AWS Lambda Python runtime.

The Lambda function needed libraries such as:

- `PyMuPDF` for extracting text from PDF documents
- `LangGraph` for building the document-processing workflow
- `LangChain` for working with the LLM workflow
- `langchain-openai` for connecting LangChain to the OpenAI-compatible API endpoint
- Other supporting Python dependencies required by these libraries

AWS Lambda does not automatically install packages from `pip` when the function runs. The dependencies therefore had to be packaged and made available to the Lambda runtime.

For this project, I used a **Lambda container image as a build environment** to install the Python dependencies into the directory that Lambda uses for Python packages.

### 1. Create a directory for the dependencies

I first created a directory that would contain the installed Python packages:

```bash
mkdir python
```

The directory name is important because AWS Lambda layers use a specific structure for Python dependencies.

The resulting structure was:

```text
python/
```

### 2. Install the Python dependencies

I installed the required packages into the `python` directory using `pip`:

```bash
pip install \
    pymupdf \
    langchain \
    langgraph \
    langchain-openai \
    -t python/
```

The `-t python/` option tells `pip` to install the packages into that directory instead of installing them globally.

After installation, the directory contained the packages and their dependencies:

```text
python/
├── fitz/
├── pymupdf/
├── langchain/
├── langgraph/
├── langchain_openai/
├── ...
```

There will also be many additional packages because libraries such as LangGraph and LangChain have their own dependencies.

### 3. Why I used a Lambda-compatible environment

Installing Python packages directly on Windows or another operating system can cause problems when those packages contain native binaries.

This is particularly important for packages such as `PyMuPDF`.

Lambda runs on an AWS Linux environment, so the dependencies need to be compatible with the environment in which the Lambda function executes.

To avoid installing incompatible binaries, I used an AWS Lambda Python container image as the build environment.

For example:

```bash
docker run --rm \
  -v "${PWD}:/var/task" \
  public.ecr.aws/lambda/python:3.14 \
  /bin/sh -c \
  "pip install pymupdf langchain langgraph langchain-openai -t /var/task/python"
```

This mounts the current directory into the container and installs the dependencies into:

```text
/var/task/python
```

Because `/var/task` is mapped to the current directory, the resulting `python` folder is available on my local machine after the container exits.

The important part of the command is:

```bash
pip install ... -t /var/task/python
```

This installs the dependencies into the directory structure expected by a Lambda Python layer.

## Creating the Lambda Layer

Instead of putting all of the third-party packages directly into the Lambda function deployment package, I created a Lambda layer.

A Lambda layer allows dependencies to be packaged separately from the function's application code.

The resulting layer structure looked like:

```text
lambda-layer/
└── python/
    ├── pymupdf/
    ├── langchain/
    ├── langgraph/
    ├── langchain_openai/
    └── ...
```

I then compressed the directory into a ZIP file.

From the directory containing the `python` folder:

```bash
zip -r lambda-layer.zip python/
```

This produced:

```text
lambda-layer.zip
```

The `python` directory must be at the root of the ZIP file.

For example, this is correct:

```text
lambda-layer.zip
└── python/
    ├── langgraph/
    ├── langchain/
    ├── pymupdf/
    └── ...
```

Whereas this structure would be incorrect:

```text
lambda-layer.zip
└── lambda-layer/
    └── python/
        └── ...
```

The difference matters because Lambda automatically adds the layer's `/opt/python` directory to Python's module search path.

## Publishing the Layer Using the AWS Console

Once the ZIP file was created, I published it as a layer using the AWS Management Console rather than the CLI.

The steps were:

1. Open the **Lambda** service in the AWS Console.
2. In the left-hand navigation panel, select **Layers** (under **Additional resources**).
3. Click **Create layer**.
4. Under **Layer configuration**, fill in:
   - **Name**: `legal-document-pipeline-dependencies`
   - **Description**: `Python dependencies for the legal document processing pipeline`
5. Under **Upload a .zip file**, choose **Upload** and select the `lambda-layer.zip` file created earlier.
6. Under **Compatible runtimes**, select **Python 3.14**.
7. Optionally set **Compatible architectures** to match the Lambda function (for example, `x86_64`).
8. Click **Create** to publish the layer.

AWS creates a new version of the layer each time it is published, starting at version 1.

Once created, the layer is listed under **Lambda > Layers** and is ready to be attached to a function.

## Attaching the Layer to the Lambda Function

With the layer published, I attached it to the Lambda function through the Console:

1. Open the **Lambda** service and select the function, for example `pdf-processor`.
2. Scroll down to the **Layers** section beneath the function's code editor.
3. Click **Add a layer**.
4. Choose **Custom layers**.
5. From the **Custom layers** dropdown, select `legal-document-pipeline-dependencies`.
6. From the **Version** dropdown, select the version to attach (for example, version 1).
7. Click **Add** to attach the layer to the function.

The **Layers** section on the function's configuration page then shows the attached layer, its version, and the runtimes it's compatible with.

Once attached, Lambda makes the layer available to the function at runtime, in the same way the CLI's `--layers` flag does when passed the layer's ARN.

## One Combined Dependency Layer

Initially, the dependencies could be separated into multiple layers, for example:

```text
Layer 1
├── PyMuPDF
└── PDF dependencies

Layer 2
├── LangChain
├── LangGraph
└── OpenAI dependencies
```

However, for this project I decided to package the dependencies into **one combined layer**.

The resulting architecture was simpler:

```text
Lambda Function
│
├── Application code
│   ├── lambda_function.py
│   └── graph.py
│
└── Lambda Layer
    └── python/
        ├── PyMuPDF
        ├── LangChain
        ├── LangGraph
        ├── langchain-openai
        └── supporting dependencies
```

This meant that the Lambda deployment package contained my application code while the layer contained the external Python dependencies.

## Verifying the Dependencies

After attaching the layer, I tested whether the Lambda runtime could import the packages.

For example:

```python
import fitz
from langgraph.graph import StateGraph
from langchain_openai import ChatOpenAI
```

If these imports work, it confirms that Lambda can find the packages provided by the layer.

For the PDF processing portion of the application, I used:

```python
import fitz

pdf = fitz.open(
    stream=content,
    filetype="pdf"
)
```

The `fitz` module comes from the `PyMuPDF` package.

For the AI workflow, I used:

```python
from graph import graph
```

The graph itself was built using LangGraph and used `ChatOpenAI` to communicate with the OpenAI-compatible endpoint.

## An Important Lesson About Lambda Dependencies

The key lesson was that adding a Python import to the code is not enough.

For example, writing:

```python
import fitz
```

does not install PyMuPDF.

The package must exist somewhere that the Lambda runtime can access.

The dependency flow is therefore:

```text
Python Code
     │
     ▼
import fitz
     │
     ▼
PyMuPDF package
     │
     ▼
Installed into Lambda layer
     │
     ▼
Lambda loads layer at runtime
```

The same applies to:

```python
from langgraph.graph import StateGraph
```

and:

```python
from langchain_openai import ChatOpenAI
```

Those packages were included in the dependency layer so that the Lambda function could import them when it executed.

## Why I Used a Layer Instead of Putting Everything in the Function Package

Separating the dependencies from the application code provided a cleaner deployment structure.

The Lambda function package could contain the project-specific code:

```text
lambda/
├── lambda_function.py
└── graph.py
```

while the layer contained the third-party dependencies:

```text
layer/
└── python/
    ├── pymupdf/
    ├── langchain/
    ├── langgraph/
    ├── langchain_openai/
    └── ...
```

This separation also makes it easier to update the application code without rebuilding all of the dependencies every time.

For example, changing:

```python
graph.invoke(...)
```

only requires updating the Lambda function code. The dependency layer does not need to change unless the Python packages themselves change.

## Dependency Packaging Summary

The overall process was:

```text
1. Identify required packages
          │
          ▼
2. Create python/ directory
          │
          ▼
3. Use Lambda Python container
          │
          ▼
4. pip install packages into python/
          │
          ▼
5. Create lambda-layer.zip
          │
          ▼
6. Publish the layer to AWS
          │
          ▼
7. Attach the layer to Lambda
          │
          ▼
8. Import the dependencies from the Lambda code
          │
          ▼
9. Test the Lambda function
```

The final Lambda architecture therefore separated the **business logic** from the **runtime dependencies**, while keeping all of the required Python packages together in a single Lambda layer.