// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

export const StyledTaskSection = styled(Stack)(() => ({
  width: "100%",
  // ----DEBUG---
  // border: "3px dashed pink",
}));

export const StyledAddTask = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  // ----DEBUG---
  // border: "3px dashed pink",
}));

export const StyledTaskBoard = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),

  /* Mobile and Tablet */
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",

  /* Desktop */
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  // ----DEBUG---
  // border: "1px solid pink",
}));

export const StyledTaskList = styled(Stack)(({ theme }) => ({
  width: "320px",
  minHeight: '300px',
  // ----DEBUG---
  // border: "1px dashed blue",
}));

export const StyledListHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(2),
  // padding: theme.spacing(0, 2)
}));

export const StyledTask = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

export const StyledTaskDeleteButton = styled(IconButton)(() => ({
  color: "gray",
  "&:hover": { color: "red" },
}));
