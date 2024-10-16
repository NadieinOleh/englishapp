import { Flashcard } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  flashcards: [] as Flashcard[],
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    addFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
      state.flashcards = [...action.payload];
    },

    removeFlashcard: (state, action: PayloadAction<string>) => {
      state.flashcards = state.flashcards.filter(
        (flashcard) => flashcard.id !== action.payload
      );
    },
  },
});

export const { addFlashcards, removeFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
