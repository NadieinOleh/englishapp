"use client";

import Loading from "./components/Loading/Loading";
import LogIn from "./components/LogIn/LogIn";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <main className="flex flex-col justify-center">
      {status === "unauthenticated" && !session ? (
        <LogIn />
      ) : (
        <h1 className="text-3xl font-bold animate__animated animate__bounce">
          animate
        </h1>
      )}
    </main>
  );
}
