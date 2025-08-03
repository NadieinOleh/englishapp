"use client";

import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PayPalProvider from "./components/PayPalProvider/PayPalProvider";

import { InputForPayment } from "./components/InputForPayment/InputForPayment";

const Donation = () => {
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("USD");



  return (
    <div className="custom-main flex justify-evenly mt-8">
      <div className="">
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

        <PayPalProvider >
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
                  "Оплата прошла успешно, " + details?.payer?.name?.given_name
                );
              }}
              onError={(err) => {
                console.error("Ошибка оплаты:", err);
              }}
            />
          </div>
        </PayPalProvider>
      </div>

        <div className="text-center text-secondary">text for paypal</div>
    </div>
  );
};

export default Donation;
