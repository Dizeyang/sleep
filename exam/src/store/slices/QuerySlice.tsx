// src/store/slices/querySlice.js
import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: {
      page: 1,
      pagesize: 5,
    },
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = { ...state.query, ...action.payload };
    },
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;