import { PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb, TABLE_NAME } from "../utils/dynamodb.mjs";

// Samma fält som seed-scriptet sparar, så att admin och menysidan
// läser och skriver exakt samma sorts rader i tabellen.
export interface MenuItem {
  itemId: string;
  title: string;
  description: string;
  price: number;
  category: "food" | "drinks";
  image: string;
}

// Hämtar alla menyrätter via indexet GSI1 (alla rätter har GSI1PK = "MENU")
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: { ":pk": "MENU" },
    })
  );

  // Plockar ut bara de fält vi behöver från varje rad
  return (result.Items ?? []).map((item) => ({
    itemId: item.itemId,
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    image: item.image,
  }));
};

// Sparar (eller skriver över) en rätt med samma nycklar som seed-scriptet
export const saveMenuItem = async (item: MenuItem): Promise<void> => {
  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `MENUITEM#${item.itemId}`,
        SK: "METADATA",
        GSI1PK: "MENU",                       // så att getMenu hittar rätten
        GSI1SK: `CATEGORY#${item.category}`,  // så att man kan filtrera på kategori
        ...item,
      },
    })
  );
};

// Tar bort en rätt. Nyckeln måste se ut exakt som när den sparades.
export const deleteMenuItem = async (itemId: string): Promise<void> => {
  await dynamodb.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: `MENUITEM#${itemId}`, SK: "METADATA" },
    })
  );
};