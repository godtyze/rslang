const audioPlayer = new Audio();


export async function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  await audioPlayer.play();
}

export const getRandomElement = (n: number) => {
  return Math.floor(Math.random() * n);
}

export function shuffle(arr: string[]) {
  let idx = arr.length, randomIdx;
  while (idx != 0) {
    randomIdx = Math.floor(Math.random() * idx);
    idx--;
    [arr[idx], arr[randomIdx]] = [
      arr[randomIdx], arr[idx]];
  }
  return arr;
}
