"use client";

import { addTitle } from "@/lib/store/features/title/titleSlice";
import { RootState } from "@/lib/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flashcard } from "@/utils/types";
import { addFlashcards } from "@/lib/store/features/flashcards/flashcardSlice";
import Loading from "@/app/components/Loading/Loading";

const FlashCards = ({ params }: { params: { title: string } }) => {
  const dispatch = useDispatch();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const { flashcards: flashRedux } = useSelector(
    (state: RootState) => state.flashcards
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log(flashRedux, "flash");
  const getData = async (title: string) => {
    try {
      setIsLoading(true);
      const url = `/api/getFlashcards?title=${encodeURIComponent(title)}`;

      const res = await fetch(url);
      const data = await res.json();

      setFlashcards(data.flashcards);
      dispatch(addFlashcards(data.flashcards));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(addTitle(params.title));
  }, [dispatch, params.title]);

  useEffect(() => {
    getData(params.title);
  }, [params.title]);

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

        {isLoading && <Loading />}

        {flashcards.map((card) => (
          <div key={card.id}>
            <p> {card.term ? card.term : "..."}</p>
            <p>{card.definition ? card.definition : "..."}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FlashCards;
