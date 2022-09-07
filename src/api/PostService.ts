import {paths} from "../consts/consts";
import {Word} from "../types/types";

export default class PostService {
  static async getWords(page = 0, group = 0): Promise<Array<Word>> {
    const response = await fetch(`${paths.words}?group=${group}&page=${page}`);
    return await response.json();
  }
}
