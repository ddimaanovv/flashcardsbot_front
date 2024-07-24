import { useEffect } from "react";

export default function useRecieveData(
  URL: string,
  userTgId: number | undefined,
  setWords: any,
  initialWords: any
) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userTgId === undefined) {
          setWords(initialWords);
          return;
        }
        const response = await fetch(`${URL}${userTgId}`);
        const words = await response.json();
        console.log(words);
        setWords(words);
      } catch (error) {
        setWords([]);
      }
    };
    fetchData();
  }, [URL, userTgId, setWords, initialWords]);
}
