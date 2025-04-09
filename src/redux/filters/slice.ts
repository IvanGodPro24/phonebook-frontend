import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "./filters.types";

const initialState: FiltersState = {
  query: "",
};

const slice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;
