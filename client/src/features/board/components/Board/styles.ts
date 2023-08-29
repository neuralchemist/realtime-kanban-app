// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StyledBoard = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: theme.spacing(2),

  /* Mobile and Tablet */
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",

  // ----DEBUG---
  // border: "3px dotted blue",
  // width: '90vw'
}));
