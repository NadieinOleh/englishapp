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
            $
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

          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base  text-black placeholder:text-black focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6"
            >
              <option className="bg-secondary hover:primary">USD</option>
              <option className="bg-secondary hover:primary">EUR</option>
            </select>
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            >
              <path
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
