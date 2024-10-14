"use client";

import { addTitle } from "@/lib/store/features/title/titleSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FlashCards = ({ params }: { params: { title: string } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTitle(params.title));
  }, [dispatch, params.title]);

  return (
    <main className="custom-main">
      <div>
        <h1 className="text-white text-3xl font-bold mb-4 sm:text-4xl">
          {params.title}
        </h1>
        <div className="bg-white w-full h-1 rounded mb-5"></div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <Link
            href="/create-set"
            className="w-full sm:w-fit bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md"
          >
            Create Flashcards
          </Link>
          <Link
            href="/"
            className="w-full sm:w-fit bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md"
          >
            Edit Flashcards
          </Link>
          <Link
            href="/"
            className="w-full sm:w-fit bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md"
          >
            Create folder
          </Link>
          <Link
            href="/"
            className="w-full sm:w-fit bg-mainText border-b-8 border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-10 py-10 rounded shadow-md"
          >
            Create folder
          </Link>
        </div>

        <p>This is a dynamic blog post page for .</p>
      </div>
    </main>
  );
};

export default FlashCards;
