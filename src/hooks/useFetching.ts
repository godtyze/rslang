import {useState} from "react";

export const useFetching = (callback: () => Promise<void>) => {
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      await callback();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return [fetching, error];
}