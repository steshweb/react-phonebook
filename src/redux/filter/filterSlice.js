import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    getFilterAction(state, { payload }) {
      return (state = payload);
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { getFilterAction } = filterSlice.actions;
