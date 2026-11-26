import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../services/db.mjs";

const TABLE_NAME: string = "cantina-db";

type MenuEvent = {
    queryStringParameters?: {
        category?: string;
    };
};

type MenuResponse = {
    statusCode: number;
    body: string; 
};

export const handler = async (event: MenuEvent): Promise<MenuResponse> => {
    try {
        const category: string | undefined = event.queryStringParameters?.category;

        if (category && category !== "food" && category !== "drinks") {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Category must be 'food' or 'drinks'" })
            };
        }

        let keyCondition: string = "GSI1PK = :pk";
        const values: { [key: string]: string } = { ":pk": "MENU" };

        if (category) {
            keyCondition += " AND GSI1SK = :sk";
            values[":sk"] = `CATEGORY#${category}`;
        }

        const result = await db.send(
            new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: "GSI1", 
                KeyConditionExpression: keyCondition,
                ExpressionAttributeValues: values
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items ?? [])
        };
    } catch (error: unknown) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Could not get menu" })
        };
    }
};
