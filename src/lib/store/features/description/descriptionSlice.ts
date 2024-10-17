import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Description {
    description: string;
}

const initialState: Description = {
    description: '',
};

const descriptionSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {
    addDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { addDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;
