/**
      1) Отрефакторить код (вынести все по переменным, по компонентам и файлам)
 done 2) Реалтзовать строку поиска
      3) Повесить загрузку на кнопки пока жду результат с сервера
 done 4) Сделать заглушку если все слова удалены или их нет
 done 5) Добавить чтобы тема была как в телеге (темная или светлая)s
 */

import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { wordType } from "./components/wordWrapperComponent/word.type";
import { SearchField } from "./components/searchComponent/SearchField";
import { MyModal } from "./components/modal/MyModal";
import useRecieveData from "./services/useRecieveData";
import { WordWrapperComponent } from "./components/wordWrapperComponent/WordWrapperComponent";

declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp;

function App() {
  let [words, setWords] = useState<Array<wordType>>();
  let [wordToDelete, setWordToDelete] = useState<wordType>();
  let [searchInput, setSearchInput] = useState("");
  let [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    tg.ready();
  }, []);

  useRecieveData(tg, setWords);

  function searchInputHandler(newText: string) {
    setSearchInput(newText);
  }

  function deleteWordHandler(wordToDelete: wordType) {
    setModalActive(true);
    setWordToDelete(wordToDelete);
  }

  return (
    <div>
      <Container maxWidth={"sm"}>
        <SearchField
          searchInput={searchInput}
          searchInputHandler={searchInputHandler}
        />
        <WordWrapperComponent
          words={words}
          setWords={setWords}
          searchInput={searchInput}
          tgInitData={tg.initData}
          tgUserId={tg.initDataUnsafe?.user?.id}
          deleteWordHandler={deleteWordHandler}
        />
      </Container>
      <MyModal
        tgInitData={tg.initData}
        tgUserId={tg.initDataUnsafe?.user?.id}
        setWords={setWords}
        modalActive={modalActive}
        setModalActive={setModalActive}
        wordToDelete={wordToDelete}
      />
    </div>
  );
}

export default App;
