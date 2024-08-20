import axios from "axios";

export const api = {
  getWords: getWords,
  editWord: editWord,
  deleteWord: deleteWord,
};

const axiosInstance = axios.create({
  baseURL:
    "http://flash-cards-fc-748769-2ed571-81-200-158-10.traefik.me:5000/words/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

async function getWords(userId: number, tgInitData: string) {
  try {
    const response = await axiosInstance.post(`${userId}`, {
      tgInitData: tgInitData,
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
    const response = await axiosInstance.put("", {
      tgInitData: tgInitData,
      id: wordToChangeId,
      tgId: tgUserId,
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
    const response = await axiosInstance.delete("", {
      data: {
        tgInitData: tgInitData,
        id: wordToDeleteId,
        tgId: tgUserId,
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
