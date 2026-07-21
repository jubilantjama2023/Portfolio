import test from "node:test";
import assert from "node:assert/strict";
import {
  createExpandedCategoryState,
  groupPostsByCategory,
  toPostRecord,
  toggleCategoryState,
} from "./postUtils.js";

test("toPostRecord reads a category from markdown frontmatter", () => {
  const raw = `---
title: "Using GitHub Actions to deploy to S3 and CloudFront"
date: "2026-07-21"
tag: "Automation"
category: "Deployment"
excerpt: "From Manual Uploads to One Push"
---

Body copy`;

  assert.deepEqual(toPostRecord("./posts/Github actions automation.md", raw), {
    slug: "Github actions automation",
    title: "Using GitHub Actions to deploy to S3 and CloudFront",
    date: "2026-07-21",
    tag: "Automation",
    category: "Deployment",
    excerpt: "From Manual Uploads to One Push",
    content: "Body copy",
  });
});

test("groupPostsByCategory nests posts under reusable category headings", () => {
  const deploymentIntro = {
    slug: "portfolio-deployment",
    title: "Deploying on AWS",
    category: "Deployment",
  };
  const deploymentAutomation = {
    slug: "github-actions-automation",
    title: "GitHub Actions",
    category: "Deployment",
  };
  const testingPost = {
    slug: "test-automation",
    title: "Test Automation",
    category: "Testing",
  };
  const uncategorizedPost = {
    slug: "notes",
    title: "Notes",
  };

  assert.deepEqual(
    groupPostsByCategory([
      deploymentIntro,
      deploymentAutomation,
      testingPost,
      uncategorizedPost,
    ]),
    [
      {
        name: "Deployment",
        posts: [deploymentIntro, deploymentAutomation],
      },
      {
        name: "Testing",
        posts: [testingPost],
      },
      {
        name: "Uncategorized",
        posts: [uncategorizedPost],
      },
    ],
  );
});

test("createExpandedCategoryState opens every category by default", () => {
  assert.deepEqual(
    createExpandedCategoryState([{ name: "Deployment" }, { name: "Testing" }]),
    {
      Deployment: true,
      Testing: true,
    },
  );
});

test("toggleCategoryState flips a single category open state", () => {
  assert.deepEqual(
    toggleCategoryState(
      {
        Deployment: true,
        Testing: false,
      },
      "Deployment",
    ),
    {
      Deployment: false,
      Testing: false,
    },
  );
});
