import React from "react";
import Modal from "./Modal";
import { Box, Button, Typography } from "@mui/material";
import { api } from "../../services/api";
import { wordType } from "../wordWrapperComponent/word.type";

type MyModalType = {
  tgInitData: string;
  tgUserId: string;
  setWords: (words: Array<wordType>) => void;
  modalActive: boolean;
  setModalActive: (znach: boolean) => void;
  wordToDelete: wordType | undefined;
};

export function MyModal({
  tgInitData,
  tgUserId,
  setWords,
  modalActive,
  setModalActive,
  wordToDelete,
}: MyModalType) {
  async function confirmWordDelete() {
    if (wordToDelete) {
      const response = await api.deleteWord(
        tgInitData,
        wordToDelete.id,
        tgUserId,
        wordToDelete.word,
        wordToDelete.translate
      );
      if (response.data.message === undefined) {
        setWords(response.data);
        setModalActive(false);
      }
    }
  }

  function canselWordDelete() {
    setModalActive(false);
  }

  return (
    <Modal active={modalActive} setActive={setModalActive}>
      <Typography variant="h5">Удалить слово</Typography>
      <Box
        sx={{
          marginTop: "20px",
          minWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{wordToDelete?.word}</Typography>
          <Typography>{wordToDelete?.translate}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button onClick={confirmWordDelete} variant="contained" color="error">
            Удалить
          </Button>
          <Button onClick={canselWordDelete} variant="outlined">
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
