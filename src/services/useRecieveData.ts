import { useEffect } from "react";
import { initialWords } from "../mock-data/initialWords";
import { api } from "./api";

export default function useRecieveData(tg: any, setWords: any) {
  useEffect(() => {
    try {
      const fetchData = async () => {
        if (tg.initDataUnsafe?.user?.id === undefined) {
          setWords(initialWords);
          return;
        }

        const words = await api.getWords(
          tg.initDataUnsafe?.user?.id,
          tg.initData
        );

        console.log(words);

        setWords(words);
        tg.ready();
      };
      fetchData();
    } catch (error) {
      setWords([]);
    }
  }, [tg, setWords]);
}
