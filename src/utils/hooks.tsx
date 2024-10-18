import { useState } from "react";
import { Flashcard } from "@/utils/types";

export const useFlashcards = (initialFlashcards: Flashcard[] = []) => {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [isRemoved, setIsRemoved] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleInputChange = (
    id: string,
    field: keyof Flashcard,
    value: string
  ) => {
    setError("");
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const addFlashCard = (id: string) => {
    setError("");
    setIsRemoved(null);
    setFlashcards((prev) => [
      ...prev,
      {
        id: id + Math.floor(Math.random() * 1000),
        term: "",
        definition: "",
        count: prev.length + 1,
      },
    ]);
  };

  const removeFlashCard = (id: string) => {
    setError("");
    setIsRemoved(id);
    setTimeout(() => {
      setFlashcards((prev) => prev.filter((card) => id !== card.id));
    }, 700);
  };

  return {
    flashcards,
    setFlashcards,
    handleInputChange,
    addFlashCard,
    removeFlashCard,
    isRemoved,
    error,
    setError,
  };
};
