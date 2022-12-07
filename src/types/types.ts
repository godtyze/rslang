export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export type glossaryParams = {
  page: string;
  group: string;
}

export type User = {
  email: string;
  password: string;
}

export type registerRes = {
  id: string;
  email: string;
}

export type SingInRes = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  tokenExpire?: string;
}

export type UserState = {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  tokenExpire: string;
  token: string;
  refreshToken: string;
  userId: string;
}

export type GlossaryState = {
  words: Word[];
  isLoading: boolean;
  error: string;
  currentPage: number;
  currentGroup: number;
}