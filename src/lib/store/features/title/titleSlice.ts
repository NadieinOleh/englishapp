import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Title {
  title: string;
}

const initialState: Title = {
  title: '',
};

const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    addTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { addTitle } = titleSlice.actions;

export default titleSlice.reducer;
