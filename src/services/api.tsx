import axios from "axios";

export const api = {
  getWords: getWords,
  editWord: editWord,
  deleteWord: deleteWord,
};

const INITIAL_TGID = "123456789";

// const axiosInstance = axios.create({
//   baseURL:
//     "https://flash-cards-fc-748769-2ed571-81-200-158-10.traefik.me/words/",
//   timeout: 5000,
//   headers: { "Content-Type": "application/json" },
// });

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/words/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

async function getWords(tgUserId: number, tgInitData: string) {
  try {
    const response = await axiosInstance.post(`${tgUserId || INITIAL_TGID}`, {
      tgInitData: tgInitData || "123",
    });
    return response.data;
  } catch (error) {
    return errorAxiosHandler(error);
  }
}

async function editWord(
  tgInitData: string,
  wordToChangeId: number,
  tgUserId: string,
  word: string,
  translate: string
) {
  try {
    let tgUserIdForQuery = tgUserId || INITIAL_TGID;
    const response = await axiosInstance.put("", {
      tgInitData: tgInitData,
      id: wordToChangeId,
      tgId: tgUserIdForQuery.toString(),
      word: word,
      translate: translate,
    });
    return response.data;
  } catch (error) {
    return errorAxiosHandler(error);
  }
}

async function deleteWord(
  tgInitData: string,
  wordToDeleteId: number,
  tgUserId: string,
  word: string,
  translate: string
) {
  try {
    let tgUserIdForQuery = tgUserId || INITIAL_TGID;
    const response = await axiosInstance.delete("", {
      data: {
        tgInitData: tgInitData,
        id: wordToDeleteId,
        tgId: tgUserIdForQuery.toString(),
        word: word,
        translate: translate,
      },
    });
    return response.data;
  } catch (error) {
    return errorAxiosHandler(error);
  }
}

function errorAxiosHandler(error: any) {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  } else {
    return error;
  }
}
