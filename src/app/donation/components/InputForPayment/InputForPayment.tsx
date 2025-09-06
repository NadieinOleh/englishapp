"use client";

import { FC } from "react";

interface InputProps {
  value: string;
  currency: string;
  setValue: (value: string) => void;
  setCurrency: (value: string) => void;
}

export const InputForPayment: FC<InputProps> = ({
  value,
  setValue,
  setCurrency,
  currency,
}) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setValue(val);
    }
  };

  return (
    <div className="">
      <div className="mb-5 ">
        <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-secondary border-secondaryDark border-2">
          <div className="shrink-0 text-base text-black select-none sm:text-sm/6 ">
            €
          </div>
          <input
            id="price"
            type="text"
            inputMode="decimal"
            pattern="[0-9]*"
            value={value}
            onChange={handlerChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />

       
        </div>
      </div>
    </div>
  );
};
