// Här arbetar vi med själva endpointen
import { QueryCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../services/db.mts";
import { createStripePaymentIntent } from "../services/stripe.service.mts";
import { successResponse, errorResponse } from "../responses/response.mts";
import { error } from "console";

const TABLE_NAME = "cantina-db";

// Vad frontend skickar in för typ.

interface CartItem {
  id: string;
  quantity: number;
}

interface PaymentEvent {
  body: string; // detta är från frontend // JSON.
}

export const handler = async (event: PaymentEvent) => {
  try {
    // parsa inkommande body från frontend
    const body = JSON.parse(event.body);
    const cartItem: CartItem[] = body.items;
    if (!cartItem || cartItem.length === 0) {
      return errorResponse(400, "cantina wars cart is empty");
    }
    // Hämtar alla menyrader från dynamoDB baserat på id
    // Använder BatchGetCommand för att hämta flera items effektivt
    const keys = cartItems.map((item) => ({
      PK: `MENUITEM#${item.id}`,
      SK: "METADATA",
    }));

    const menuItems = dbResult.response?.[TABLE_NAME] ?? [];
    // Bygg stripe-lineItems och räkna ut totalen
    const stripeLineItems = cartItems.map((cartItem) => {
      const menuItems = menuItems.find((item) => item.itemID === cartItem.id);
    });

    if(!menuItem) => {
        throw new Error (`menu item with id "${cartItem.id}" not found `)
    }
    if (cartItem.quantity <= 0) {
        throw new error (`Invalid quantity for item "${cartItem.id}"`)
    }
    return {
        name: menuItem.name as string,
        price: (menuItems.price as number= * 100, // stripe vill ha ören.
            quantity: cartItem.quantity,
    }
    const clientSecret = await createStripePaymentIntent(stripeLineItems)
    return successResponse ({clientSecret})
  } catch (error: unknown) {
    console.error("error inte createPaymentIntent", error);
    const message = error instanceOf error ? error.message : "unknown error";
    return errorResponse(500,message)
  }
};
