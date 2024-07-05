"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./mockStripePayStyle.css";
import { mockTestService } from "../../services";
import MockCheckoutForm from "./MockCheckoutForm";
// /stripePay
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

export default function MockStripePay({submittedId}) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyMockId, setBuyMockId] = useState("");

  useEffect(() => {
    async function fetchAllData() {
        setLoading(true)
        let response = await mockTestService.getPaymentIntentApi(
            { items: [{ id: submittedId }] }
          );
      
        console.log(response)
        if(response.variant === "success"){
          setLoading(false)
          setClientSecret(response.clientSecret);
          setBuyMockId(response.buyMockId)
        }else {
            console.log(response); setLoading(false)
        }
    }
        fetchAllData()
  }, []);
  console.log({clientSecret,buyMockId})

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App" style={{marginLeft:"40px"}}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <MockCheckoutForm buyMockId={buyMockId}/>
        </Elements>
      )}
    </div>
  );
}