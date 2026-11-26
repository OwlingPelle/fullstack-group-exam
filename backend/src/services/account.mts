
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

import { dynamodb, TABLE_NAME } from "../utils/dynamodb.mjs";

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export const getAdminAccount = async (
  id: string
): Promise<AdminAccount | null> => {
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk AND SK = :sk",
      ExpressionAttributeValues: {
        ":pk": "ADMIN",
        ":sk": `ADMIN#${id}`,
      },
    })
  );

  const item = result.Items?.[0];

  if (!item) {
    return null;
  }

  return {
    id: item.SK.replace("ADMIN#", ""),
    name: item.name,
    email: item.email,
    role: "admin",
  };
};

export const saveAdminAccount = async (
  account: AdminAccount
): Promise<void> => {
  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: "ADMIN",
        SK: `ADMIN#${account.id}`,
        name: account.name,
        email: account.email,
      },
    })
  );
};
