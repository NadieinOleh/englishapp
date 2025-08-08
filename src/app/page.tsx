"use client";

import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";

import Loading from "./components/Loading/Loading";
import LogIn from "./components/LogIn/LogIn";
import { STACKTECH, TECHNOLOGIES } from "@/utils/constants";

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
        <div className="custom-main  mt-5">
          <h1 className="text-3xl text-center text-secondary mb-2 font-bold animate__animated animate__bounce">
            This app is created as an analogue to Quizlet, for learning foreign
            words.
          </h1>

          <h2 className="text-xl text-center mb-3 text-mainText font-bold">
            In this app you can:
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECHNOLOGIES.map((tech) => (
              <li
                key={tech}
                className="flex items-center justify-center text-center text-lg p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg text-grey font-bold hover:bg-yellow-200 transition "
              >
                {tech}
              </li>
            ))}
          </ul>

          <h2 className="text-3xl mb-5 mt-5 text-secondary text-center  font-bold animate__animated animate__bounce">
            The technologies that were used:
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {STACKTECH.map((stack) => (
              <li
                key={stack}
                className="flex  items-center gap-2 bg-gray-100 p-3 rounded-lg text-grey-400 font-bold hover:bg-gray-400 transition"
              >
                <FaCheckCircle className="text-yellow-500" />
                {stack}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
