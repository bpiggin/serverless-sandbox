import { Handler } from "@lib/types/api";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import { buildResponse } from "@middleware/buildResponse";

const handler: Handler = async () => {
  return "Hello world!";
};

export const main = middy(handler).use(buildResponse()).use(cors());
