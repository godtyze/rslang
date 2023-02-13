import moment from "moment/moment";
import {expireTime} from "../consts/consts";

const audioPlayer = new Audio();

export async function playAudio(url: string): Promise<void> {
  audioPlayer.src = url;
  audioPlayer.load();
  await audioPlayer.play();
}

export const getRandomElement = (n: number): number => {
  return Math.floor(Math.random() * n);
}

export function shuffle(arr: string[]): string[] {
  let idx = arr.length, randomIdx;
  while (idx !== 0) {
    randomIdx = Math.floor(Math.random() * idx);
    idx--;
    [arr[idx], arr[randomIdx]] = [
      arr[randomIdx], arr[idx]];
  }
  return arr;
}

export function getErrorMessage (error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function getNextExpireTime(): string {
  return moment().add(expireTime, 'hours').toISOString();
}

export function isSafari(): boolean {
  return window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome');
}