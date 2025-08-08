"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({
  currency = "USD",
  children,
}: {
  currency?: string;
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
   
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", currency: currency.toUpperCase() }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
