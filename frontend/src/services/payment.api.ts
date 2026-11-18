import type { PaymentItemType } from "../types/payment.types";

// What our backend sends back
type PaymentIntentResponse = {
    clientSecret : string;
};

// Asks our backend (AWS Lambda) to create a payment at Stripe.
// We get back a "clientSecret": the key that connects the payment
// page to this one payment.
export const createPaymentIntent = async (
    items : PaymentItemType[]
) : Promise<string> => {
    // VITE_API_URL comes from the file frontend/.env.local
    const url = `${import.meta.env.VITE_API_URL}/create-payment-intent`;

    const response = await fetch(url, {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({ items }),
    });

    if (!response.ok) {
        throw new Error("Could not start the payment");
    }

    const data : PaymentIntentResponse = await response.json();

    return data.clientSecret;
};
