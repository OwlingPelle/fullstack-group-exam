import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../services/db.mts";
import { createStripePaymentIntent } from "../services/stripe.service.mts";
import { successResponse, errorResponse } from "../responses/response.mts";

const TABLE_NAME = "cantina-db";

// Vad frontend skickar in
interface CartItem {
  id: string;
  quantity: number;
}

interface PaymentEvent {
  body?: string | null;
}

export const handler = async (event: PaymentEvent) => {
  try {
    // 1. Kontrollera inkommande request
    if (!event.body) {
      return errorResponse(400, "Request body is missing");
    }

    let body: { items?: unknown };

    try {
      body = JSON.parse(event.body);
    } catch {
      return errorResponse(400, "Invalid JSON in request body");
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return errorResponse(400, "Cart is empty");
    }

    // 2. Validera kundvagnens innehåll
    const cartItems: CartItem[] = [];

    for (const item of body.items) {
      if (
        !item ||
        typeof item !== "object" ||
        !("id" in item) ||
        !("quantity" in item)
      ) {
        return errorResponse(400, "Invalid cart item");
      }

      const { id, quantity } = item;

      if (
        typeof id !== "string" ||
        id.trim().length === 0 ||
        !Number.isSafeInteger(quantity) ||
        typeof quantity !== "number" ||
        quantity <= 0
      ) {
        return errorResponse(400, "Invalid product ID or quantity");
      }

      cartItems.push({ id, quantity });
    }

    // 3. Samla eventuella dubbla produkter
    const quantities = new Map<string, number>();

    for (const item of cartItems) {
      const totalQuantity = (quantities.get(item.id) ?? 0) + item.quantity;

      if (!Number.isSafeInteger(totalQuantity)) {
        return errorResponse(400, "Invalid total quantity");
      }

      quantities.set(item.id, totalQuantity);
    }

    const uniqueItems = Array.from(quantities, ([id, quantity]) => ({
      id,
      quantity,
    }));

    // DynamoDB BatchGet tillåter maximalt 100 unika nycklar
    if (uniqueItems.length > 100) {
      return errorResponse(400, "Too many different products in cart");
    }

    // 4. Hämta produkterna från DynamoDB
    const keys = uniqueItems.map((item) => ({
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

    // Kontrollera om DynamoDB inte hämtade alla poster
    const unprocessedKeys = dbResult.UnprocessedKeys?.[TABLE_NAME]?.Keys ?? [];

    if (unprocessedKeys.length > 0) {
      throw new Error("DynamoDB could not retrieve all requested products");
    }

    const menuItems = dbResult.Responses?.[TABLE_NAME] ?? [];

    // 5. Kontrollera produkterna och bygg Stripe-underlaget
    const stripeLineItems = uniqueItems.map((cartItem) => {
      const menuItem = menuItems.find((item) => item.itemId === cartItem.id);

      if (!menuItem) {
        throw new Error(`Menu item "${cartItem.id}" not found`);
      }

      if (
        typeof menuItem.price !== "number" ||
        !Number.isFinite(menuItem.price) ||
        menuItem.price <= 0
      ) {
        throw new Error(`Invalid price for menu item "${cartItem.id}"`);
      }

      // DynamoDB har priset i kronor.
      // Stripe behöver priset i ören.
      const priceInOre = Math.round(menuItem.price * 100);

      if (!Number.isSafeInteger(priceInOre)) {
        throw new Error(`Invalid price for menu item "${cartItem.id}"`);
      }

      return {
        price: priceInOre,
        quantity: cartItem.quantity,
      };
    });

    // 6. Skapa PaymentIntent hos Stripe
    const clientSecret = await createStripePaymentIntent(stripeLineItems);

    // 7. Skicka tillbaka clientSecret till frontend
    return successResponse({ clientSecret });
  } catch (error: unknown) {
    console.error("Error in createPaymentIntent:", error);

    return errorResponse(500, "Could not create payment intent");
  }
};
