import {paths} from "../consts/consts";
import {Word} from "../types/types";

export default class PostService {
  static async getWords(group = 0, page = 0): Promise<Word[]> {
    const response = await fetch(`${paths.words}?group=${group}&page=${page}`);
    return await response.json();
  }
}
