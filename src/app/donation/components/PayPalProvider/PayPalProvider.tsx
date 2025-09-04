"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({
  currency = "EUR",
  children,
}: {
  currency?: string;
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: currency,
        intent: "capture",
        components: "buttons",
      }}
      deferLoading={false}
    >
      {children}
    </PayPalScriptProvider>
  );
}
