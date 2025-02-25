import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { wordType } from "../word.type";

type PropsType = {
  deleteWordHandler: (wordToDelete: wordType) => void;
  word: wordType;
};

export function DeleteButton({ deleteWordHandler, word }: PropsType) {
  return (
    <IconButton
      onClick={(e) => {
        deleteWordHandler(word);
      }}
      style={{
        color: "#fff",
        backgroundColor: "red",
        borderRadius: "15px",
        height: "60px",
        width: "60px",
        marginLeft: "2px",
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
