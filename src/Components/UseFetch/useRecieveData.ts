import { useEffect } from "react";

export default function useRecieveData(
  URL: string,
  userTgId: number | undefined,
  setWords: any
) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}${userTgId}`);
        const words = await response.json();
        console.log(words);
        setWords(words);
      } catch (error) {
        setWords([]);
      }
    };
    fetchData();
  }, []);
}
