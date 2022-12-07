import {glossarySlice} from "../reducers/GlossarySlice";
import {AppDispatch} from "../store";
import PostService from "../../api/PostService";

const {wordsLoading, wordsLoadingError, wordsLoadingSuccess} = glossarySlice.actions;

export const loadWords = (group: number, page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(wordsLoading());
    const words = await PostService.getWords(group, page);
    dispatch(wordsLoadingSuccess(words));
  } catch (e) {
    dispatch(wordsLoadingError('Произошла ошибка при загрузке страницы'));
  }
}

export const glossaryAsyncActionCreators = {
  loadWords
}