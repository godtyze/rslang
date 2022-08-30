import {paths} from "../consts/consts";
import {Word} from "../../types/types";

export default class PostService {
  static async getWords(group: number, page: number): Promise<Array<Word>> {
    const response = await fetch(`${paths.words}?group=${group}&page=${page}`);
    const data = await response.json();

    return data;
  }
}