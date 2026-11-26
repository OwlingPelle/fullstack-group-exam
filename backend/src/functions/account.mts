
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

import {
  getAdminAccount,
  saveAdminAccount,
} from "../services/account.mjs";

export const getAdminAccountHandler: APIGatewayProxyHandlerV2 = async (
  event
) => {
  try {
    const id = event.queryStringParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Admin ID is required" }),
      };
    }

    const account = await getAdminAccount(id);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
    };
  } catch (error) {
    console.error("Could not get admin account:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not get admin account" }),
    };
  }
};

export const saveAdminAccountHandler: APIGatewayProxyHandlerV2 = async (
  event
) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is required" }),
      };
    }

    const account = JSON.parse(event.body);

    if (!account.id || !account.name || !account.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "ID, name and email are required" }),
      };
    }

    await saveAdminAccount({
      id: account.id,
      name: account.name,
      email: account.email,
      role: "admin",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin account saved" }),
    };
  } catch (error) {
    console.error("Could not save admin account:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not save admin account" }),
    };
  }
};
