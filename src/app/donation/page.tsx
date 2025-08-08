"use client";

import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PayPalProvider from "./components/PayPalProvider/PayPalProvider";
import { InputForPayment } from "./components/InputForPayment/InputForPayment";
import { PayPalPolicy } from "./components/PayPalPolicy/PayPalPolicy";

const Donation = () => {
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("EUR");

  return (
    <div className="custom-main flex justify-between gap-6 mt-8 flex-col md:flex-row md:items-start items-center">
      <div className=" md:w-1/2">
        <h1 className="text-2xl mb-4 text-center text-secondary font-bold">
          You can send charity via{" "}
          <span className="text-[#009CDE]">PayPal</span>{" "}
        </h1>

        <InputForPayment
          value={value}
          setValue={setValue}
          currency={currency}
          setCurrency={setCurrency}
        />

        <PayPalProvider currency={currency}>
          <div className="">
            <PayPalButtons
              disabled={!value}
              style={{
                layout: "vertical",
                color: "gold",
                shape: "pill",
                label: "paypal",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        value: value.toString(),
                        currency_code: currency,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order?.capture();
                alert(
                  "Success payment, " + details?.payer?.name?.given_name
                );
              }}
              onError={(err) => {
                console.error("Payment error:", err);
              }}
            />
          </div>
        </PayPalProvider>
      </div>

      <PayPalPolicy />
    </div>
  );
};

export default Donation;
