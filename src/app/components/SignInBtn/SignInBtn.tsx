"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const SignInBtn = () => {
  return (
    <button className="flex gap-2 justify-center items-center border-rounded border-2  border-slate-900 px-4 py-2 rounded-full" onClick={() => signIn("google")}>
      <Image src="/google.png" alt="google" width={30} height={20} />
      <p >Sign in with Google</p>
    </button>
  );
};
