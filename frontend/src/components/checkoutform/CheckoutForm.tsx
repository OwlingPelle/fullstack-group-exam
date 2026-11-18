import { useState } from "react";
import type { FormEvent } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkoutform.css";

// The form with Stripe's card fields.
// useStripe() and useElements() only work inside <Elements>,
// so this component must be placed inside <Elements> on the payment page.
type PropType = {
    formId : string; // so the pay button outside the form can submit it
    onPaid : () => void; // called when the payment has gone through
    setIsPaying : (isPaying : boolean) => void; // tells the page when we are paying
};

const CheckoutForm = ({ formId, onPaid, setIsPaying } : PropType) => {
    const stripe = useStripe(); // Stripe's tools
    const elements = useElements(); // the fields the user fills in

    const [errorMessage, setErrorMessage] = useState("");

    // Runs when the pay button is pressed
    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Stripe hasn't loaded yet
        if (!stripe || !elements) {
            return;
        }

        setIsPaying(true);
        setErrorMessage("");

        // The card details go straight to Stripe, never via our backend
        const result = await stripe.confirmPayment({
            elements,
            // Only leave the page if the card needs it, e.g. a bank check
            redirect : "if_required",
            confirmParams : {
                // Where Stripe sends the user back after such a check
                return_url : `${ window.location.origin }/order-confirmed`,
            },
        });

        // Something went wrong, e.g. the card was declined
        if (result.error) {
            setErrorMessage(result.error.message ?? "The payment did not go through.");
            setIsPaying(false);
            return;
        }

        if (result.paymentIntent.status === "succeeded") {
            onPaid();
        }
    };

    return (
        <form id={ formId } className="checkout-form" onSubmit={ handleSubmit }>
            <div className="checkout-form__box">
                {/* Stripe draws the card number, date and CVC fields here */}
                <PaymentElement />
            </div>

            {
                errorMessage && (
                    <p className="checkout-form__error" role="alert">
                        { errorMessage }
                    </p>
                )
            }
        </form>
    );
};

export default CheckoutForm;
