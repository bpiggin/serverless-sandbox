import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: "serverless-sandbox",
  frameworkVersion: "2",
  package: {
    individually: true,
  },
  plugins: [
    "serverless-webpack",
    "serverless-bundle",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    stage: "dev",
    region: "eu-west-2",
  },
  functions: {
    hello: {
      handler: "src/functions/hello/hello.main",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
