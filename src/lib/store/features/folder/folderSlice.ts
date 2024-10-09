import { createSlice } from '@reduxjs/toolkit';

interface FolderState {
  value: number;
}

const initialState: FolderState = {
  value: 0,
};

export const folderReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = folderReducer.actions;

export default folderReducer.reducer;
