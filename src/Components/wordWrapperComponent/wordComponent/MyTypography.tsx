import { Typography } from "@mui/material";
import React from "react";

type MyTypographyType = {
  word: string;
  variant: "h6" | "body1";
};

export function MyTypography({ word, variant }: MyTypographyType) {
  return (
    <Typography
      variant={variant}
      sx={{
        padding: "5px 5px",
        lineHeight: 1,
        margin: "1px 0px",
      }}
    >
      {word}
    </Typography>
  );
}
