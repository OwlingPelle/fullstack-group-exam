import Stripe from "stripe";

interface StripeLineItem {
  price: number;
  quantity: number;
}

export const createStripePaymentIntent = async (
  items: StripeLineItem[],
): Promise<string> => {
  try {
    // Kontrollera att Stripe-nyckeln finns
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    // Kontrollera att kundvagnen innehåller produkter
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided for payment");
    }

    // Beräkna totalbeloppet i ören
    const amount = items.reduce((total, item) => {
      if (!Number.isSafeInteger(item.price) || item.price <= 0) {
        throw new Error("Invalid product price");
      }

      if (!Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
        throw new Error("Invalid product quantity");
      }

      return total + item.price * item.quantity;
    }, 0);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Invalid payment amount");
    }

    // Anslut till Stripe
    const stripe = new Stripe(secretKey);

    // Skapa PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "sek",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe did not return a client secret");
    }

    return paymentIntent.client_secret;
  } catch (error: unknown) {
    console.error("Error creating Stripe PaymentIntent:", error);
    throw error;
  }
};
