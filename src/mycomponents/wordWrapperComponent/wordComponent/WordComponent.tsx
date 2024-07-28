import { Box } from "@mui/material";
import React from "react";
import { wordType } from "../word.type";
import { MyTextField } from "./MyTextField";
import { MyTypography } from "./MyTypography";

type WordComponentType = {
  word: wordType;
  changingWordID: number;
  wordInput: string;
  translateInput: string;
  wordInputHandler: (newText: string) => void;
  translateInputHandler: (newText: string) => void;
};

export function WordComponent({
  word,
  changingWordID,
  wordInput,
  translateInput,
  wordInputHandler,
  translateInputHandler,
}: WordComponentType) {
  return (
    <Box pr={1} sx={{ width: "100%" }}>
      {word.id === changingWordID ? (
        <div>
          <MyTextField
            input={wordInput}
            inputHandler={wordInputHandler}
            autoFocus={true}
          />
          <MyTextField
            input={translateInput}
            inputHandler={translateInputHandler}
            autoFocus={false}
          />
        </div>
      ) : (
        <div>
          <MyTypography variant="h6" word={word.word} />
          <MyTypography variant="body1" word={word.translate} />
        </div>
      )}
    </Box>
  );
}
