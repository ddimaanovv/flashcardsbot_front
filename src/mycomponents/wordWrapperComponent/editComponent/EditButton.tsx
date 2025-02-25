import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { wordType } from "../word.type";
import { Typography } from "@mui/material";

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
              height: "60px",
              width: "60px",
              display: "flex",
              flexDirection: "column",
            }
          : {
              color: "#fff",
              backgroundColor: "#e86e30",
              borderRadius: "15px",
              height: "60px",
              width: "60px",
            }
      }
    >
      <EditIcon />
      {word.id === changingWordID ? (
        <Typography
          sx={{
            fontSize: "0.7rem;",
            color: "#fff",
          }}
        >
          сохранить
        </Typography>
      ) : (
        <div></div>
      )}
    </IconButton>
  );
}
