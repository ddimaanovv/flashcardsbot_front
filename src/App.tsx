/**
      1) Отрефакторить код (вынести все по переменным, по компонентам и файлам)
 done 2) Реалтзовать строку поиска
      3) Повесить загрузку на кнопки пока жду результат с сервера
 done 4) Сделать заглушку если все слова удалены или их нет
 done 5) Добавить чтобы тема была как в телеге (темная или светлая)
 */

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
import Modal from "./components/modal/Modal";
import axios from "axios";
import dotenv from "dotenv";
import { wordType } from "./components/wordWrapperComponent/wordComponent/word.type";

dotenv.config();

declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp;

type wordsType = Array<wordType>;

function App() {
  let [words, setWords] = useState<wordsType>();
  let [changingWordID, setChangingWordID] = useState(-1);
  let [wordInput, setWordInput] = useState("");
  let [translateInput, setTranslateInput] = useState("");
  let [wordToDelete, setWordToDelete] = useState<wordType>();
  let [modalActive, setModalActive] = useState(false);
  let [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    tg.ready();
  }, []);

  function changeWordHandler(wordToChange: wordType) {
    if (changingWordID === wordToChange.id) {
      async function editWord() {
        const response = await axios.put(`${URL}`, {
          tgInitData: tg.initData,
          id: wordToChange?.id,
          tgId: String(tg.initDataUnsafe?.user?.id),
          word: wordInput,
          translate: translateInput,
        });

        if (response.data.message === undefined) {
          setWords(response.data);
          setChangingWordID(-1);
        }
      }
      editWord();
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
  function searchInputHandler(newText: string) {
    setSearchInput(newText);
  }
  function deleteWordHandler(wordToDelete: wordType) {
    setModalActive(true);
    setWordToDelete(wordToDelete);
  }

  function confirmWordDelete() {
    async function deleteWord() {
      const response = await axios.delete(`${URL}`, {
        data: {
          tgInitData: tg.initData,
          id: wordToDelete?.id,
          tgId: String(tg.initDataUnsafe?.user?.id),
          word: wordToDelete?.word,
          translate: wordToDelete?.translate,
        },
      });
      if (response.data.message === undefined) {
        setWords(response.data);
        setModalActive(false);
      }
    }
    deleteWord();
  }

  function canselWordDelete() {
    setModalActive(false);
  }

  let filteredWords = words?.filter((word) => {
    return (
      word.word.toLowerCase().includes(searchInput.toLowerCase()) ||
      word.translate.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <div>
      <Container maxWidth={"sm"}>
        <TextField
          variant="outlined"
          size="small"
          value={searchInput}
          fullWidth
          type="search"
          placeholder="Поиск"
          autoComplete="off"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            searchInputHandler(event.target.value);
          }}
          sx={{
            input: {
              //color: "black",
            },
            margin: "5px 0px",
          }}
        ></TextField>
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
                  <Box pr={1} sx={{ width: "100%" }}>
                    {word.id === changingWordID ? (
                      <div>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={wordInput}
                          fullWidth
                          autoFocus
                          autoComplete="off"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            wordInputHandler(event.target.value);
                          }}
                          sx={{
                            input: {
                              //color: "black",
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
                          autoComplete="off"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            translateInputHandler(event.target.value);
                          }}
                          sx={{
                            input: {
                              //color: "black",
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
          })
        )}
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
