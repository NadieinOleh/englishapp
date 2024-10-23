"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Card from "./components/Card";
import { RootState } from "@/lib/store/store";
import TitleSet from "../components/TitleSet/TitleSet";
import ButtonSet from "../components/ButtonSet/ButtonSet";
import TextareaSet from "../components/TextareaSet/TextareaSet";
import { handleScrollToTop } from "@/utils/helper";
import AddBtnSet from "../components/AddBtnSet/AddBtnSet";
import {useFlashcards} from "@/utils/hooks";
import { addDescription } from "@/lib/store/features/description/descriptionSlice";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/navigation";


import ErrorMessage from "../components/ErrorSet/ErrorSet";
const CreateSet = () => {
  const id = useId();
  const { flashcards, handleInputChange, addFlashCard, removeFlashCard, isRemoved, error, setError } =
    useFlashcards([{ term: "", definition: "", id }]);

  const { data: session } = useSession();
  const [description, setDescription] = useState("");
  const title = useSelector(({ title }: RootState) => title.title);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()


  const createFlashcards = async () => {
    setIsDisabled(true);
    const res = await fetch("/api/createSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        flashcards,
        user: session?.user?.email,
        description,
      }),
    });

    if (!res.ok) {
      setError("Failed to create set");
      handleScrollToTop(topRef);
      setIsDisabled(false);
      return;
    }

    dispatch(addDescription(description))
    router.push(`/library/${title}`);
  };

  
  const handleAddFlashCard = () => {
    addFlashCard(id);
    if (flashcards.length >= 2) {
      setIsDisabled(false);
    }
  };

  const handleRemoveFlashCard = (cardId: string) => {
    removeFlashCard(cardId);
    if (flashcards.length <= 3) {
      setIsDisabled(true);
    }
  };

  if (!session) {
    return redirect('/')
   }

  return (
    <div className="custom-main" ref={topRef}>
      <div className="flex justify-start items-center gap-4 mb-4">
        <TitleSet title={"Create a new flashcard set"} />
        <ButtonSet
          isDisabled={isDisabled}
          createOrEdit={createFlashcards}
          value={"Create"}
          style={true}
        />
        <ErrorMessage message={error} />
      </div>

      <div className="bg-white w-full h-1 rounded "></div>

      <div className="my-5 flex-col">
        <TextareaSet description={description} setDescription={setDescription} />

        <section>
          <Card
            flashCards={flashcards}
            handleInputChange={handleInputChange}
            removeFlashCard={handleRemoveFlashCard}
            isRemoved={isRemoved}
          />

          <AddBtnSet addFlashCard={handleAddFlashCard} />

          <div className="h-fit w-full flex-col rounded bg-gray-400 flex justify-center items-center px-4 py-6">
            <ButtonSet
              isDisabled={isDisabled}
              createOrEdit={createFlashcards}
              value={"Create"}
              style={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateSet;
