import * as DynamoDB from "aws-sdk/clients/dynamodb";
import { Table as DDBTTable } from "dynamodb-toolbox";

const getTableName = (): string => {
  const { tableName } = process.env;
  if (!tableName) {
    throw new Error("env.tableName must be defined");
  }
  return tableName;
};

export const client = new DynamoDB.DocumentClient({});

export const GSI1 = "GSI1Core";

export default new DDBTTable({
  name: getTableName(),
  partitionKey: "PK",
  sortKey: "SK",
  DocumentClient: client,
  indexes: {
    [GSI1]: { partitionKey: "GSI1PK", sortKey: "GSI1SK" },
  },
});
