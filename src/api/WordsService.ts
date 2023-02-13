import {Word} from "../types/types";
import {serverRoutes} from "../consts/consts";

export default class WordsService {
  static async getWords(group = 0, page = 0): Promise<Word[]> {
    const response = await fetch(`${serverRoutes.words}?group=${group}&page=${page}`);
    return await response.json();
  }
}