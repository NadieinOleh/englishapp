'use client'

import LogIn from "./components/LogIn/LogIn";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col justify-center">
      {status === 'authenticated' && session ? (
        <h1 className="text-3xl font-bold animate__animated animate__bounce">animate</h1>

      ): (
        <LogIn />
      )}
    </main>
  );
}