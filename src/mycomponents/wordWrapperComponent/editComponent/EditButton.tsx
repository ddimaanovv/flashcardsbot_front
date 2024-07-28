import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { wordType } from "../word.type";

type PropsType = {
  changeWordHandler: any;
  word: wordType;
  changingWordID: number;
};

export function EditButton({
  changeWordHandler,
  word,
  changingWordID,
}: PropsType) {
  return (
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
  );
}
