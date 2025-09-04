"use client";
import React, { useState } from "react";
import { InputForPayment } from "./components/InputForPayment/InputForPayment";
import { PayPalPolicy } from "./components/PayPalPolicy/PayPalPolicy";
import PayPalCheckout from "./components/PayPalCheckout/PayPalCheckout";
import PayPalProvider from "./components/PayPalProvider/PayPalProvider";

const Donation = () => {
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("EUR");

  console.log("currency", currency);

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

        <PayPalProvider currency={currency} >
          <PayPalCheckout currency={currency} value={value} />
        </PayPalProvider>
      </div>

      <PayPalPolicy />
    </div>
  );
};

export default Donation;
