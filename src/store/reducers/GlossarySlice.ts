import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlossaryState, Word} from "../../types/types";

const initialState: GlossaryState = {
  words: [],
  isLoading: false,
  error: '',
  currentGroup: 1,
  currentPage: 1
};

export const glossarySlice = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    wordsLoading(state) {
      state.isLoading = true;
    },
    wordsLoadingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    wordsLoadingSuccess(state, action: PayloadAction<Word[]>) {
      state.isLoading = false;
      state.error = '';
      state.words = action.payload;
    },
    setGroup(state, action: PayloadAction<number>) {
      state.currentGroup = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  }
});

export default glossarySlice.reducer;