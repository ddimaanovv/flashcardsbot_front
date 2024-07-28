import { TextField } from "@mui/material";
import React from "react";

type MyTextFieldType = {
  input: string;
  inputHandler: (newText: string) => void;
  autoFocus: boolean;
};

export function MyTextField({
  input,
  inputHandler,
  autoFocus,
}: MyTextFieldType) {
  return (
    <TextField
      variant="outlined"
      size="small"
      value={input}
      fullWidth
      autoFocus={autoFocus}
      autoComplete="off"
      onClick={(e) => e.stopPropagation()}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        inputHandler(event.target.value);
      }}
      sx={{
        input: {
          padding: "0px 5px",
          lineHeight: 1,
          height: "26px",
        },
        margin: "1px 0px 2px",
      }}
    ></TextField>
  );
}
