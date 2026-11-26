import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getMenuItems } from "../services/menu.mjs";

export const getMenu: APIGatewayProxyHandlerV2 = async () => {
  try {
    const items = await getMenuItems();

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error("Could not fetch menu:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not fetch menu",
      }),
    };
  }
};