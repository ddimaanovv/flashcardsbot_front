import React, { useState } from "react";
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
  let [words, setWords] = useState(initialWords);
  let [changingWordID, setChangingWordID] = useState(-1);
  let [wordInput, setWordInput] = useState("");
  let [translateInput, setTranslateInput] = useState("");
  let [wordToDelete, setWordToDelete] = useState<wordType>();

  let [modalActive, setModalActive] = useState(false);

  function changeWordHandler(wordToChange: wordType) {
    if (changingWordID === wordToChange.id) {
      setChangingWordID(-1);
      let newMassOfWords = words.map((word) => {
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
    setWords(words.filter((word) => word.id !== wordToDelete?.id));
    setModalActive(false);
  }

  function canselWordDelete() {
    setModalActive(false);
  }

  return (
    <div>
      <Container maxWidth={"sm"}>
        {words.map((word) => {
          return (
            <Container key={word.id} disableGutters>
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
                    onClick={() => changeWordHandler(word)}
                    style={{
                      color: "#fff",
                      backgroundColor: "#e86e30",
                      borderRadius: "0",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteWordHandler(word)}
                    style={{
                      color: "#fff",
                      backgroundColor: "red",
                      borderRadius: "0",
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
