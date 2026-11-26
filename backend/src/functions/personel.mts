import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

import {
  getPersonnel,
  savePersonnel,
  deletePersonnel,
  type Personnel,
} from "../services/personel.mjs";

export const getPersonnelHandler: APIGatewayProxyHandlerV2 = async () => {
  try {
    const personnel = await getPersonnel();

    return {
      statusCode: 200,
      body: JSON.stringify(personnel),
    };
  } catch (error) {
    console.error("Could not fetch personnel:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not fetch personnel" }),
    };
  }
};

export const savePersonnelHandler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing personnel" }),
      };
    }

    const person = JSON.parse(event.body) as Personnel;

    if (
      !person.id ||
      !person.name ||
      !person.email ||
      !person.position ||
      !person.phone ||
      !["Active", "Inactive"].includes(person.status)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid personnel" }),
      };
    }

    await savePersonnel(person);

    return {
      statusCode: 200,
      body: JSON.stringify(person),
    };
  } catch (error) {
    console.error("Could not save personnel:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not save personnel" }),
    };
  }
};

export const removePersonnel: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing personnel ID" }),
      };
    }

    await deletePersonnel(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Personnel deleted" }),
    };
  } catch (error) {
    console.error("Could not delete personnel:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not delete personnel" }),
    };
  }
};
