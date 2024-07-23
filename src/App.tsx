import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "./Components/Modal/Modal";
import useRecieveData from "./Components/UseFetch/useRecieveData";

declare global {
  interface Window {
    Telegram: any;
  }
}
const URL = "//127.0.0.1:5000/words/";
const tg = window.Telegram.WebApp;
console.log(tg.initDataUnsafe);

type wordType = {
  id: number;
  userID: string;
  word: string;
  translate: string;
};

type wordsType = Array<wordType>;

let initialWords: wordsType = [
  { id: 4, userID: "493242203", word: "Home", translate: "дом" },
  {
    id: 5,
    userID: "493242203",
    word: "Indispensable",
    translate: "неотъемлемый",
  },
  {
    id: 6,
    userID: "493242203",
    word: "Appliance",
    translate: "прибор или устройство",
  },
  { id: 7, userID: "493242203", word: "Go", translate: "идти" },
  {
    id: 8,
    userID: "493242203",
    word: "Eminent",
    translate: "выдающийся",
  },
];

function App() {
  let [words, setWords] = useState<wordsType>();
  let [changingWordID, setChangingWordID] = useState(-1);
  let [wordInput, setWordInput] = useState("");
  let [translateInput, setTranslateInput] = useState("");
  let [wordToDelete, setWordToDelete] = useState<wordType>();
  let [modalActive, setModalActive] = useState(false);

  const userTgId = tg.initDataUnsafe?.user?.id;
  console.log(userTgId);

  useRecieveData(URL, userTgId, setWords, initialWords);

  useEffect(() => {
    tg.ready();
  }, []);

  function changeWordHandler(wordToChange: wordType) {
    if (changingWordID === wordToChange.id) {
      setChangingWordID(-1);
      let newMassOfWords = words?.map((word) => {
        if (word.id === wordToChange.id) {
          return {
            ...word,
            word: wordInput,
            translate: translateInput,
          };
        } else {
          return word;
        }
      });
      setWords(newMassOfWords);
    } else {
      setChangingWordID(wordToChange.id);
      setWordInput(wordToChange.word);
      setTranslateInput(wordToChange.translate);
    }
  }

  function cancelChangeWordHandler() {
    setChangingWordID(-1);
  }

  function wordInputHandler(newText: string) {
    setWordInput(newText);
  }
  function translateInputHandler(newText: string) {
    setTranslateInput(newText);
  }
  function deleteWordHandler(wordToDelete: wordType) {
    setModalActive(true);
    setWordToDelete(wordToDelete);
  }

  function confirmWordDelete() {
    setWords(words?.filter((word) => word.id !== wordToDelete?.id));
    setModalActive(false);
  }

  function canselWordDelete() {
    setModalActive(false);
  }

  return (
    <div>
      <Container maxWidth={"sm"}>
        {words?.map((word) => {
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
                <Box pr={1} sx={{ width: "100%" }}>
                  {word.id === changingWordID ? (
                    <div>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={wordInput}
                        fullWidth
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          wordInputHandler(event.target.value);
                        }}
                        sx={{
                          input: {
                            color: "black",
                            padding: "0px 5px",
                            lineHeight: 1,
                            height: "26px",
                          },
                          margin: "1px 0px 2px",
                        }}
                      ></TextField>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={translateInput}
                        fullWidth
                        onClick={(e) => e.stopPropagation()}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          translateInputHandler(event.target.value);
                        }}
                        sx={{
                          input: {
                            color: "black",
                            padding: "0px 5px",
                            lineHeight: 1,
                            height: "26px",
                          },
                          margin: "2px 0px",
                        }}
                      ></TextField>
                    </div>
                  ) : (
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          padding: "5px 5px",
                          lineHeight: 1,
                          margin: "1px 0px",
                        }}
                      >
                        {word.word}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          padding: "5px 5px",
                          lineHeight: 1,
                          margin: "1px 0px",
                        }}
                      >
                        {word.translate}
                      </Typography>
                    </div>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      changeWordHandler(word);
                    }}
                    style={
                      word.id === changingWordID
                        ? {
                            color: "#fff",
                            backgroundColor: "#00c300",
                            borderRadius: "15px",
                            height: "50px",
                            width: "50px",
                          }
                        : {
                            color: "#fff",
                            backgroundColor: "#e86e30",
                            borderRadius: "15px",
                            height: "50px",
                            width: "50px",
                          }
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      deleteWordHandler(word);
                    }}
                    style={{
                      color: "#fff",
                      backgroundColor: "red",
                      borderRadius: "15px",
                      height: "50px",
                      width: "50px",
                      marginLeft: "2px",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
            </Container>
          );
        })}
      </Container>
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
            <Button
              onClick={confirmWordDelete}
              variant="contained"
              color="error"
            >
              Удалить
            </Button>
            <Button onClick={canselWordDelete} variant="outlined">
              Отмена
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
