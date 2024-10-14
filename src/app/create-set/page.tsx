"use client";

import React, { useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Card from "./components/Card";
import { Flashcard, HandleInputChange } from "@/utils/types";
import { RootState } from "@/lib/store/store";
const CreateSet = () => {
  const id = useId();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRemoved, setIsRemoved] = useState<string | null>(null);
  const { data: session } = useSession();
  const [description, setDescription] = useState("");
  const router = useRouter();

  const [flashcard, setFlashcard] = useState([
    {
      term: "",
      definition: "",
      id,
    },
  ]);

  const title = useSelector(({ title }: RootState) => title.title);
  const [createSetError, setCreateSetError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange: HandleInputChange = (
    id: string,
    field: keyof Flashcard,
    value: string
  ) => {
    setCreateSetError("");

    setFlashcard((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const addFlashCard = () => {
    setIsRemoved(null);
    setCreateSetError("");

    setFlashcard((prev) => [
      ...prev,
      {
        id: id + Math.floor(Math.random() * 1000),
        term: "",
        definition: "",
        count: prev.length + 1,
      },
    ]);

    if (flashcard.length >= 2) {
      setIsDisabled(false);
    }
  };

  const removeFlashCard = (id: string) => {
    setCreateSetError("");
    setIsRemoved(id);
    setTimeout(() => {
      setFlashcard((prev) => prev.filter((card) => id !== card.id));
    }, 700);

    if (flashcard.length <= 3) {
      setIsDisabled(true);
    }
  };

  const createFlashcards = async () => {
    const res = await fetch("/api/createSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        flashcards: flashcard,
        user: session?.user?.email,
        description,
      }),
    });

    if (!res.ok) {
      console.log("error with create set");
      setCreateSetError("Failed to create set");
      handleScrollToTop();
      return;
    }

    return router.push(`/library/${title}`);
  };

  return (
    <div className="custom-main" ref={topRef}>
      <div className="flex justify-start items-center gap-4 mb-4">
        <h1 className="text-white  text-2xl font-bold  sm:text-4xl">
          Create a new flashcard set
        </h1>

        <input
          type="button"
          disabled={isDisabled}
          value={"Create"}
          onClick={createFlashcards}
          className={` p-2 rounded border-2 font-bold  
    ${
      !isDisabled
        ? "animate__animated animate__jello animate__infinite animate__slower cursor-pointer"
        : ""
    } 
    ${
      isDisabled
        ? "border-mainText/45 text-secondary/45 bg-gray-600"
        : "bg-secondary text-primary"
    }
  `}
        />

        <p className="text-red-500 text-2xl font-bold animate-pulse">
          {createSetError}
        </p>
      </div>

      <div className="bg-white w-full h-1 rounded "></div>

      <div className="my-5 flex-col">
        <textarea
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          className=" h-20 text-lg font-bold text-primary resize-none w-full md:w-1/2 rounded bg-gray-400 p-2 focus:outline-none focus:border-b-4 border-b-secondary placeholder:text-gray-200 mb-5"
        />

        <section>
          <Card
            flashCards={flashcard}
            handleInputChange={handleInputChange}
            removeFlashCard={removeFlashCard}
            isRemoved={isRemoved}
            id={id}
          />

          <div className="h-fit mb-5 w-full flex-col rounded bg-gray-400 flex justify-center items-center px-4 py-6">
            <button
              onClick={addFlashCard}
              className="flex justify-center items-center gap-1 border-b-4 border-b-primary text-md font-semibold text-primary hover:border-b-secondary hover:text-secondary"
            >
              <span className="font-bold text-lg">+</span>
              <span className="font-bold ">ADD CARD</span>
            </button>
          </div>

          <div className="h-fit w-full flex-col rounded bg-gray-400 flex justify-center items-center px-4 py-6">
            <input
              type="button"
              disabled={isDisabled}
              value={"Create"}
              onClick={createFlashcards}
              className={` p-2 px-10  rounded border-2 font-bold  
    ${
      !isDisabled
        ? "animate__animated animate__jello animate__infinite animate__slower cursor-pointer"
        : ""
    } 
    ${
      isDisabled
        ? "border-mainText/45 text-secondary/45 bg-gray-600"
        : "bg-secondary text-primary"
    }
  `}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateSet;
