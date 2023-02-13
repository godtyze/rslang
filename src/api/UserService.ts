import {SingInRes, User} from "../types/types";
import {serverRoutes} from "../consts/consts";

export default class UserService {
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