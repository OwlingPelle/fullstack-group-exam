import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "../../stores/cartStore";
import { menuItems } from "../../data/demoMenu";
import Icon from "../../components/Icon";
import { createPaymentIntent } from "../../services/payment.api";
import type { OrderLineType } from "../../types/payment.types";
import BackButton from "../../components/backbutton/BackButton";
import Button from "../../components/button/Button";
import OrderSummary from "../../components/ordersummary/OrderSummary";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";
import "./PaymentPage.css";


// ------------------------- STRIPE:---------------------------------

// Our publishable TEST key from Stripe (starts with "pk_test_").
// It comes from the file frontend/.env.local.
// loadStripe is outside the component so Stripe only loads once.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Stripe's card fields can't read our CSS, so we give them our colors here
const appearance : Appearance = {
    theme : "night",
    variables : {
        colorPrimary : "#ee6b2f", // --color-orange
        colorBackground : "#241b30", // --color-surface
        colorText : "#f3e7cf", // --color-text
        colorDanger : "#d9432f", // --color-red
        fontFamily : "Work Sans, sans-serif",
        borderRadius : "14px",
    },
};

// The font Stripe's card fields should use
const fonts = [
    { cssSrc : "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" },
];

// The id of the form, so the pay button at the bottom can submit it
const FORM_ID = "checkout-form";

type PropType = {
    onBack : () => void; // called when the back button is pressed
    onPaid : () => void; // called when the payment has gone through
};

//----------------------------------------------------------------------------------------------

const PaymentPage = ({ onBack, onPaid } : PropType) => {
    // The cart from the store, e.g. { "nerf-kebab": 2, "comet-wings": 1 }
    const { items } = useCartStore();

    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    // Make a list of the dishes in the cart, with name and price from the menu,
    // and add up the total at the same time
    const orderLines : OrderLineType[] = [];
    let total = 0;

    menuItems.forEach((item) => {
        const quantity = items[item.id];

        if (quantity) {
            orderLines.push({
                id : item.id,
                name : item.name,
                price : item.price,
                quantity : quantity,
            });
            total = total + item.price * quantity;
        }
    });

    // When the page opens: ask our backend to create the payment
    useEffect(() => {
        const ids = Object.keys(items);

        // Nothing in the cart, nothing to pay for
        if (ids.length === 0) {
            return;
        }

        // Only id and quantity, the backend looks up the prices itself
        const paymentItems = ids.map((id) => ({ id : id, quantity : items[id] }));

        createPaymentIntent(paymentItems)
            .then((secret) => setClientSecret(secret))
            .catch(() => setErrorMessage("We could not start the payment. Please try again."));
    }, [items]);

    if (orderLines.length === 0) {
        return (
            <main className="payment page-frame">
                <p className="payment__message">Your cart is empty.</p>
            </main>
        );
    }

    return (
        <main className="payment page-frame">
            <header className="payment__header">
                <BackButton onClick={ onBack } label="Back to cart" />
                <div>
                    <p className="payment__eyebrow">Last step</p>
                    <h1 className="payment__title">Payment</h1>
                </div>
            </header>

            {/* Retro stripes, only decoration. Same stripes as on the menu page */}
            <div className="payment__stripes" aria-hidden="true" />

            <section className="payment__content">
                <OrderSummary orderLines={ orderLines } total={ total } />

                {/* Something went wrong when the payment was created */}
                {
                    errorMessage && (
                        <p className="payment__error">{ errorMessage }</p>
                    )
                }

                {/* Still waiting for the backend */}
                {
                    !clientSecret && !errorMessage && (
                        <p className="payment__message">Loading payment...</p>
                    )
                }

                {/* Ready: show Stripe's card fields */}
                {
                    clientSecret && (
                        <Elements
                            stripe={ stripePromise }
                            options={{ clientSecret, appearance, fonts, locale : "en" }}
                        >
                            <CheckoutForm
                                formId={ FORM_ID }
                                onPaid={ onPaid }
                                setIsPaying={ setIsPaying }
                            />
                        </Elements>
                    )
                }

                <p className="payment__secure">
                    {/* A padlock. aria-hidden: screen readers skip it */}
                    <Icon
                        name="lock"
                        className="payment__secure-icon"
                        aria-hidden="true"
                    />
                    Payments are handled securely by Stripe. We never store your card details.
                </p>
            </section>

            {/* The pay button sits at the bottom of the page.
                It is outside the form, so form={ FORM_ID } tells it which form to submit. */}
            <div className="payment__bar">
                <Button
                    text={ isPaying ? "Paying..." : `Pay ${ total } kr` }
                    type="submit"
                    form={ FORM_ID }
                    disabled={ !clientSecret || isPaying }
                />
            </div>
        </main>
    );
};

export default PaymentPage;
