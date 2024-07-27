import axios from "axios";
import { useEffect } from "react";

export default function useRecieveData(
  URL: string | undefined,
  tg: any,
  setWords: any,
  initialWords: any
) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tg.initDataUnsafe?.user?.id === undefined) {
          setWords(initialWords);
          return;
        }
        console.log(tg.initData);

        const response = await axios.post(
          `${URL}${tg.initDataUnsafe?.user?.id}`,
          {
            tgInitData: tg.initData,
          }
        );

        const words = await response.data;
        setWords(words);
      } catch (error) {
        setWords([]);
      }
    };
    fetchData();
  }, [URL, tg, setWords, initialWords]);
}
