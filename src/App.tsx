/**
 done 1) Отрефакторить код (вынести все по переменным, по компонентам и файлам)
 done 2) Реалтзовать строку поиска
      3) Повесить загрузку на кнопки пока жду результат с сервера
 done 4) Сделать заглушку если все слова удалены или их нет
 done 5) Добавить чтобы тема была как в телеге (темная или светлая)
      6) Зафиксировать поле поиска
      7) Поднимать слово при его редактировании
 */

import React, { useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import useRecieveData from "./services/useRecieveData";
import { wordType } from "./mycomponents/wordWrapperComponent/word.type";
import { SearchField } from "./mycomponents/searchComponent/SearchField";
import { WordWrapperComponent } from "./mycomponents/wordWrapperComponent/WordWrapperComponent";
import { MyModal } from "./mycomponents/modal/MyModal";

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
          tgUserId={String(tg.initDataUnsafe?.user?.id)}
          deleteWordHandler={deleteWordHandler}
        />
      </Container>
      <MyModal
        tgInitData={tg.initData}
        tgUserId={String(tg.initDataUnsafe?.user?.id)}
        setWords={setWords}
        modalActive={modalActive}
        setModalActive={setModalActive}
        wordToDelete={wordToDelete}
      />
    </div>
  );
}

export default App;
