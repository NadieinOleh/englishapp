"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({
  value,
  currency,
}: {
  value: string;
  currency: string;
}) {
  return (
    <PayPalButtons
      disabled={!value}
      style={{
        layout: "vertical",
        color: "gold",
        shape: "pill",
        label: "paypal",
      }}
      forceReRender={[value, currency]} 
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: value.toString(),
                currency_code: currency.toUpperCase(),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const details = await actions.order?.capture();
        alert("Success payment, " + details?.payer?.name?.given_name);
      }}
      onError={(err) => console.error("Payment error:", err)}
    />
  );
}
