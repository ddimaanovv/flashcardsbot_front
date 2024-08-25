import React from "react";
import { Box, TextField } from "@mui/material";

type SearchFieldType = {
  searchInput: string;
  searchInputHandler: (newText: string) => void;
};

export function SearchField({
  searchInput,
  searchInputHandler,
}: SearchFieldType) {
  return (
    <Box className="search">
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
          marginTop: "5px",
        }}
      ></TextField>
    </Box>
  );
}
