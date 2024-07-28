import React from "react";
import { TextField } from "@mui/material";

type SearchFieldType = {
  searchInput: string;
  searchInputHandler: (newText: string) => void;
};

export function SearchField({
  searchInput,
  searchInputHandler,
}: SearchFieldType) {
  return (
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
        margin: "5px 0px",
      }}
    ></TextField>
  );
}
