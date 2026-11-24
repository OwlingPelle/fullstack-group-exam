// Här arbetar vi med själva endpointen
import { QueryCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../services/db.mts";
import { createStripePaymentIntent } from "../services/stripe.service.mts";
import { successResponse, errorResponse } from "../responses/response.mts";
import { error } from "console";

const TABLE_NAME = "cantina-db";

// Vad frontend skickar in för typ.

// Typ för vad frontend skickar in
interface CartItem {
  id: string;
  quantity: number;
}

interface PaymentEvent {
  body: string; // JSON-sträng från frontend
}

export const handler = async (event: PaymentEvent) => {
  try {
    // 1. Parsa inkommande body från frontend
    const body = JSON.parse(event.body);
    const cartItems: CartItem[] = body.items;

    if (!cartItems || cartItems.length === 0) {
      return errorResponse(400, "Cart is empty");
    }

    // 2. Hämta alla menyrader från DynamoDB baserat på id
    // Vi använder BatchGetCommand för att hämta flera items effektivt
    const keys = cartItems.map((item) => ({
      PK: `MENUITEM#${item.id}`,
      SK: "METADATA",
    }));

    const dbResult = await db.send(
      new BatchGetCommand({
        RequestItems: {
          [TABLE_NAME]: {
            Keys: keys,
          },
        },
      }),
    );

    const menuItems = dbResult.Responses?.[TABLE_NAME] ?? [];

    // 3. Bygg Stripe-lineItems och räkna ut totalen
    const stripeLineItems = cartItems.map((cartItem) => {
      const menuItem = menuItems.find((item) => item.itemId === cartItem.id);

      if (!menuItem) {
        throw new Error(`Menu item with id "${cartItem.id}" not found`);
      }

      if (cartItem.quantity <= 0) {
        throw new Error(`Invalid quantity for item "${cartItem.id}"`);
      }

      return {
        name: menuItem.name as string,
        price: (menuItem.price as number) * 100, // Stripe vill ha ören
        quantity: cartItem.quantity,
      };
    });

    // 4. Skapa PaymentIntent hos Stripe
    const clientSecret = await createStripePaymentIntent(stripeLineItems);

    // 5. Returnera clientSecret till frontend
    return successResponse({ clientSecret });
  } catch (error: unknown) {
    console.error("Error in createPaymentIntent:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return errorResponse(500, message);
  }
};
