import { APIGatewayProxyHandler } from "aws-lambda";

export const main: APIGatewayProxyHandler = async (_) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello world!",
    }),
  };
};
