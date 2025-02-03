import React, { useEffect, useState, useCallback } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./stripePayStyle.css";
import { FRONT_ENDPOINT } from "@/app/utils";

export default function CheckoutForm({ buyCourseId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve payment intent status on component mount/update
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Prevent user from leaving the page while loading
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isLoading) {
        // Standard message is shown by the browser; custom messages are ignored.
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${FRONT_ENDPOINT}/payment/verify/${buyCourseId}`,
      },
    });

    // Handle immediate errors
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
    // When there is no error, Stripe will redirect to the return_url.
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show payment status message */}
      {message && <div id="payment-message">{message}</div>}
      {/* Extra instruction when payment is loading */}
      {isLoading && (
        <div className="loading-instruction" style={{ marginTop: "1rem", color: "#555" }}>
          Please do not close the window or press the back button while your payment is processing.
        </div>
      )}
    </form>
  );
}
