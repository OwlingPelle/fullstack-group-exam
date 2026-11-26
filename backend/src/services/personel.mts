
import {
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamodb, TABLE_NAME } from "../utils/dynamodb.mjs";

export interface Personnel {
  id: string;
  name: string;
  email: string;
  position: string;
  phone: string;
  status: "Active" | "Inactive";
}

export const getPersonnel = async (): Promise<Personnel[]> => {
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": "PERSONNEL",
      },
    })
  );

  return (result.Items ?? []).map((item) => ({
    id: item.SK.replace("PERSONNEL#", ""),
    name: item.name,
    email: item.email,
    position: item.position,
    phone: item.phone,
    status: item.status,
  }));
};

export const savePersonnel = async (person: Personnel): Promise<void> => {
  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: "PERSONNEL",
        SK: `PERSONNEL#${person.id}`,
        name: person.name,
        email: person.email,
        position: person.position,
        phone: person.phone,
        status: person.status,
      },
    })
  );
};

export const deletePersonnel = async (id: string): Promise<void> => {
  await dynamodb.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: "PERSONNEL",
        SK: `PERSONNEL#${id}`,
      },
    })
  );
};
