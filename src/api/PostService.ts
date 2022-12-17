import {serverRoutes} from "../consts/consts";
import {SingInRes, User, Word} from "../types/types";

export default class PostService {
  static async getWords(group = 0, page = 0): Promise<Word[]> {
    const response = await fetch(`${serverRoutes.words}?group=${group}&page=${page}`);
    return await response.json();
  }

  static async registerUser(user: User) {
    return await fetch(`${serverRoutes.users}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }

  static async auth(user: User): Promise<SingInRes> {
    const response = await fetch(`${serverRoutes.signIn}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    return await response.json();
  }

  static async refreshTokenRequest(token: string, id: string): Promise<SingInRes> {
    const res = await fetch(`${serverRoutes.users}/${id}/tokens`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return await res.json();
  }
}
