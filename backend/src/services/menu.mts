import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamodb, TABLE_NAME } from "../utils/dynamodb.mjs";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  color: string;
}

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": "MENU",
      },
    })
  );

  return (result.Items ?? []).map((item) => ({
    id: item.SK.replace("MENU#", ""),
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    color: item.color,
  }));
};

export const saveMenuItem = async (item: MenuItem): Promise<void> => {
  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: "MENU",
        SK: `MENU#${item.id}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        color: item.color,
      },
    })
  );
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await dynamodb.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: "MENU",
        SK: `MENU#${id}`,
      },
    })
  );
};