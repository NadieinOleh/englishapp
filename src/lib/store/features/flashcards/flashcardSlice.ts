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

    removeFlashcard: (state) => {
      state.flashcards = []
    },
  },
});

export const { addFlashcards, removeFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
