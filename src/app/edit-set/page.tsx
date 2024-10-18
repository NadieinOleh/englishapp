"use client";

import { RootState } from "@/lib/store/store";
import React, { useState, useRef, useId, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HandleInputChange } from "@/utils/types";
import TitleSet from "../components/TitleSet/TitleSet";
import ButtonSet from "../components/ButtonSet/ButtonSet";
import TextareaSet from "../components/TextareaSet/TextareaSet";
import { handleScrollToTop } from "@/utils/helper";
import Card from "../create-set/components/Card";
import AddBtnSet from "../components/AddBtnSet/AddBtnSet";
import { useFlashcards } from "@/utils/hooks";
import ErrorMessage from "../components/ErrorSet/ErrorSet";
import { useRouter } from "next/navigation";
import { addFlashcards } from "@/lib/store/features/flashcards/flashcardSlice";
import { addDescription } from "@/lib/store/features/description/descriptionSlice";

const Edit = () => {
  const { flashcards: initialFlashcards } = useSelector(
    ({ flashcards }: RootState) => flashcards
  );
  const { description: initialDescription } = useSelector(
    ({ description }: RootState) => description
  );
  const { title } = useSelector(({ title }: RootState) => title);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    flashcards,
    handleInputChange,
    addFlashCard,
    removeFlashCard,
    isRemoved,
    error,
    setError,
  } = useFlashcards(initialFlashcards);

  const [newDesc, setNewDesc] = useState(initialDescription);
  const [isDisabled, setIsDisabled] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(()=> {
    dispatch(addDescription(newDesc));
    dispatch(addFlashcards(flashcards));
  }, [newDesc, flashcards, dispatch])

  const editFlashcards = async () => {
    try {
      const res = await fetch(
        `api/editFlashcards?title=${encodeURIComponent(title)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flashcards, newDesc }),
        }
      );

      if (!res.ok) {
        setError("Failed to edit set");
        handleScrollToTop(topRef);
        setIsDisabled(false);
        return;
      }

   
      router.push(`/library/${title}`);
    } catch (err) {
      console.error(err);
    }
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

  return (
    <main className="custom-main" ref={topRef}>
      <div className="flex justify-start items-center gap-4 mb-4">
        <TitleSet title="Edit Flashcards" />

        <ButtonSet
          value="Edit"
          isDisabled={isDisabled}
          createOrEdit={editFlashcards}
          style={true}
        />

        <ErrorMessage message={error} />
      </div>

      <div className="bg-white w-full h-1 rounded"></div>

      <div className="my-5 flex-col">
        <TextareaSet description={newDesc} setDescription={setNewDesc} />

        <section>
          <Card
            flashCards={flashcards}
            handleInputChange={handleInputChange}
            removeFlashCard={handleRemoveFlashCard}
            isRemoved={isRemoved}
          />
        </section>

        <AddBtnSet addFlashCard={handleAddFlashCard} />

        <div className="h-fit w-full flex-col rounded bg-gray-400 flex justify-center items-center px-4 py-6">
          <ButtonSet
            isDisabled={isDisabled}
            createOrEdit={editFlashcards}
            value={"Edit"}
            style={false}
          />
        </div>
      </div>
    </main>
  );
};

export default Edit;
