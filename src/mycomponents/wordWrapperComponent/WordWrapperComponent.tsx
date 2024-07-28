import React from "react";
import { useState } from "react";
import { wordType } from "./word.type";
import { Box, Container, Divider, Typography } from "@mui/material";
import { DeleteButton } from "./deleteComponent/DeleteComponent";
import { EditButton } from "./editComponent/EditButton";
import { api } from "../../services/api";
import { WordComponent } from "./wordComponent/WordComponent";

type WordWrapperType = {
  words: Array<wordType> | undefined;
  setWords: (words: Array<wordType>) => void;
  searchInput: string;
  tgInitData: string;
  tgUserId: string;
  deleteWordHandler: (wordToDelete: wordType) => void;
};

export function WordWrapperComponent({
  words,
  setWords,
  searchInput,
  tgInitData,
  tgUserId,
  deleteWordHandler,
}: WordWrapperType) {
  let [changingWordID, setChangingWordID] = useState(-1);
  let [wordInput, setWordInput] = useState("");
  let [translateInput, setTranslateInput] = useState("");

  function wordInputHandler(newText: string) {
    setWordInput(newText);
  }

  function translateInputHandler(newText: string) {
    setTranslateInput(newText);
  }

  function cancelChangeWordHandler() {
    setChangingWordID(-1);
  }

  async function changeWordHandler(wordToChange: wordType) {
    if (changingWordID === wordToChange.id) {
      const words = await api.editWord(
        tgInitData,
        wordToChange.id,
        tgUserId,
        wordInput,
        translateInput
      );
      setWords(words);
      setChangingWordID(-1);
    } else {
      setChangingWordID(wordToChange.id);
      setWordInput(wordToChange.word);
      setTranslateInput(wordToChange.translate);
    }
  }

  let filteredWords = words?.filter((word) => {
    return (
      word.word.toLowerCase().includes(searchInput.toLowerCase()) ||
      word.translate.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <Box>
      {filteredWords?.length === 0 ? (
        <Typography mt={"6px"} ml={"5px"} variant="h6">
          Слова не найдены
        </Typography>
      ) : (
        filteredWords?.map((word) => {
          return (
            <Container
              key={word.id}
              disableGutters
              onClick={cancelChangeWordHandler}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0px",
                  justifyContent: "space-between",
                }}
              >
                <WordComponent
                  word={word}
                  changingWordID={changingWordID}
                  wordInput={wordInput}
                  translateInput={translateInput}
                  wordInputHandler={wordInputHandler}
                  translateInputHandler={translateInputHandler}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EditButton
                    changeWordHandler={changeWordHandler}
                    word={word}
                    changingWordID={changingWordID}
                  ></EditButton>
                  <DeleteButton
                    deleteWordHandler={deleteWordHandler}
                    word={word}
                  ></DeleteButton>
                </Box>
              </Box>
              <Divider />
            </Container>
          );
        })
      )}
    </Box>
  );
}
