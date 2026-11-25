import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../services/db.mjs";
import { createStripePaymentIntent } from "../services/stripe.service.mjs";
import { successResponse, errorResponse } from "../responses/response.mjs";

const TABLE_NAME = "cantina-db";

interface CartItem {
  id: string;
  quantity: number;
}

interface PaymentEvent {
  body?: string | null;
}

export const handler = async (event: PaymentEvent) => {
  try {
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
        typeof quantity !== "number" ||
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
      ) {
        return errorResponse(400, "Invalid product ID or quantity");
      }

      cartItems.push({ id, quantity });
    }

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

    if (uniqueItems.length > 100) {
      return errorResponse(400, "Too many different products in cart");
    }

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

    const unprocessedKeys = dbResult.UnprocessedKeys?.[TABLE_NAME]?.Keys ?? [];

    if (unprocessedKeys.length > 0) {
      throw new Error("DynamoDB could not retrieve all requested products");
    }

    const menuItems = dbResult.Responses?.[TABLE_NAME] ?? [];

    const purchasedProducts = uniqueItems.map((cartItem) => {
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

      if (typeof menuItem.title !== "string" || !menuItem.title.trim()) {
        throw new Error(`Invalid title for menu item "${cartItem.id}"`);
      }

      const priceInOre = Math.round(menuItem.price * 100);

      if (!Number.isSafeInteger(priceInOre)) {
        throw new Error(`Invalid price for menu item "${cartItem.id}"`);
      }

      return {
        id: cartItem.id,
        title: menuItem.title,
        price: priceInOre,
        quantity: cartItem.quantity,
      };
    });

    const stripeLineItems = purchasedProducts.map((product) => ({
      price: product.price,
      quantity: product.quantity,
    }));

    const metadata = {
      product_ids: purchasedProducts
        .map((product) => product.id)
        .join(",")
        .slice(0, 500),

      products: purchasedProducts
        .map((product) => `${product.title} x ${product.quantity}`)
        .join(", ")
        .slice(0, 500),
    };

    const clientSecret = await createStripePaymentIntent(
      stripeLineItems,
      metadata,
    );

    return successResponse({ clientSecret });
  } catch (error: unknown) {
    console.error("Error in createPaymentIntent:", error);

    return errorResponse(500, "Could not create payment intent");
  }
};
