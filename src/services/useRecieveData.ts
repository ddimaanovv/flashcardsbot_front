import { useEffect } from "react";
//import { initialWords } from "../mock-data/initialWords"; теперь используются данные из БД
import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

export default function useRecieveData(tg: any, setWords: any) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["words"],
    queryFn: () => api.getWords(tg.initDataUnsafe?.user?.id, tg.initData),
  });

  useEffect(() => {
    if (data) {
      setWords(data);
    }
  }, [data, setWords]);

  return { isPending, isError, error };
}
