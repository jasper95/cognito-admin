import * as cdk from "@aws-cdk/core";
import * as lambda from "@sls-next/lambda-at-edge";
import { NextStack } from "./stack";

const builder = new lambda.Builder(".", "./build", {args: ['build']});

builder
  .build(true)
  .then(() => {
    const app = new cdk.App();
    new NextStack(app, "CognitoAdmin2", {
      env: {
        // region: 'us-east-1',
      },
      description: "Testing deploying NextJS Serverless Construct"
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });