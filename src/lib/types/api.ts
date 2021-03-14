import { APIGatewayProxyEvent, Context } from "aws-lambda";

export interface IParsedAPIEvent<Body = null, PathParams = null>
  extends Omit<Omit<APIGatewayProxyEvent, "body">, "pathParameters"> {
  body: Body;
  pathParameters: PathParams;
}

export type Handler<Body = null, PathParams = null> = (
  event: IParsedAPIEvent<Body, PathParams>,
  context?: Context
) => Promise<string | Record<string, string>>;
