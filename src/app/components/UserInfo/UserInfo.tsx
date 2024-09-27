"use client";

import React from "react";
import { SignInBtn } from "../SignInBtn/SignInBtn";
import { useSession } from "next-auth/react";

export const UserInfo = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return <div>
      <p>{session.user?.name}</p>
      <p>{session.user?.email}</p>
    </div>;
  } else {
    return <SignInBtn />;
  }
};
