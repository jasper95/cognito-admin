import * as cdk from "@aws-cdk/core";
import * as next from "@sls-next/cdk-construct";
import * as lambda from "@aws-cdk/aws-lambda";

export class NextStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    new next.NextJSLambdaEdge(this, "NextJsApp", {
      serverlessBuildOutDir: "./build",
      runtime: lambda.Runtime.NODEJS_12_X,
      memory: 1024,
      timeout: cdk.Duration.seconds(30),
      withLogging: true,
      name: {
        apiLambda: `${id}Api`,
        defaultLambda: `Fn${id}`,
        imageLambda: `${id}Image`,
      },
    });
  }
}