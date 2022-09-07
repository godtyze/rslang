import {SingInRes, User} from "../types/types";
import {paths} from "../consts/consts";

export const registerUser = async (user: User) => {
  return await fetch(`${paths.users}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

export const auth = async (user: User): Promise<SingInRes> => {
  const response = await fetch(`${paths.signIn}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });

  return await response.json();
};

export const refreshTokenRequest = async (token: string, id: string): Promise<SingInRes> => {
  const res = await fetch(`${paths.users}/${id}/tokens`, {
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