"use client";

import { addTitle } from "@/lib/store/features/title/titleSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Flashcard as Card } from "@/utils/types";
import {
  addFlashcards,
  removeFlashcard,
} from "@/lib/store/features/flashcards/flashcardSlice";
import Flashcard from "./components/Flashcard/Flashcard";
import { LINKS, CREATE, EDIT, REMOVE, SHUFFLE } from "@/utils/constants";
import Loading from "@/app/components/Loading/Loading";

const FlashCards = ({ params }: { params: { title: string } }) => {
  const dispatch = useDispatch();
  const [flashcards, setFlashcards] = useState<Card[]>([]);
  const [errorRemove, setErrorRemove] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isShuffled, setIsShuffled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const removeData = async () => {
    setIsLoading(true);

    try {
      setIsLoading(false);
      const url = "/api/removeFlashcards";

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: params.title }),
      });

      if (!res.ok) {
        setErrorRemove("Can't not remove flashcards");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(addTitle(params.title));
  }, [dispatch, params.title]);

  useEffect(() => {
    getData(params.title);
    setErrorRemove("");
  }, [params.title]);

  const handleRemoveClick = () => {
    removeData();
    dispatch(removeFlashcard());
    setFlashcards([]);
  };

  const handleShuffleClick = () => {
    setIsShuffled((prev) => !prev)   
    setCurrentIndex(0)
  };

  return (
    <main className="custom-main">
      <div>
        <div className="flex gap-5 items-center justify-start">
          <h1 className=" text-white text-3xl font-bold mb-4 sm:text-4xl">
            {params.title}
          </h1>

          <p className="text-red-500 font-bold">{errorRemove}</p>
        </div>

        <div className="bg-white w-full h-1 rounded mb-5"></div>

        <div className="flex flex-row max-[861px]:flex-col max-[861px]:w-[100%] justify-center items-stretch gap-2">
          {LINKS.map(({ title, href }) => {
            const isDisabled =
              (!!flashcards.length && title === CREATE) ||
              (!flashcards.length &&
                (title === EDIT || title === REMOVE || title === SHUFFLE));

            return (
              <Link key={title} href={href}>
                <input
                  className="w-full min-[861px]:w-fit bg-mainText border-y-8 border-t-mainText border-b-transparent text-1xl hover:border-b-secondary font-bold text-primary px-5 py-3 sm:py-5 sm:px-10 rounded shadow-md cursor-pointer disabled:bg-gray-300 disabled:hover:border-b-gray-300 disabled:border-t-gray-300 disabled:cursor-not-allowed disabled:text-gray-400"
                  disabled={isDisabled}
                  type="button"
                  onClick={
                    title === REMOVE ? handleRemoveClick : handleShuffleClick
                  }
                  value={title}
                />
              </Link>
            );
          })}
        </div>

        {isLoading ? <Loading /> : <Flashcard isShuffled={isShuffled} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />}
      </div>
    </main>
  );
};

export default FlashCards;
