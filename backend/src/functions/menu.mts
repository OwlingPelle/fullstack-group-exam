
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import {
  saveMenuItem,
  deleteMenuItem,
  type MenuItem,
} from "../services/menu.mjs";

/*export const getMenu: APIGatewayProxyHandlerV2 = async () => {
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
      body: JSON.stringify({ message: "Could not fetch menu" }),
    };
  }
};*/

export const createMenu: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing menu item" }),
      };
    }

    const item = JSON.parse(event.body) as MenuItem;

    if (
      !item.itemId ||
      !item.title ||
      !item.description ||
      typeof item.price !== "number" ||
      (item.category !== "food" && item.category !== "drinks")
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid menu item" }),
      };
    }

    await saveMenuItem(item);

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error("Could not save menu item:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not save menu item" }),
    };
  }
};

export const removeMenu: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing menu item ID" }),
      };
    }

    await deleteMenuItem(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Menu item deleted" }),
    };
  } catch (error) {
    console.error("Could not delete menu item:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not delete menu item" }),
    };
  }
};
