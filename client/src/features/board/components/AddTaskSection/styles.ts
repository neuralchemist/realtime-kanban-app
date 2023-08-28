// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const StyledAddTask = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  // ----DEBUG---
  // border: "3px dashed pink",
}));

export const StyledTaskAddButton = styled(IconButton)(() => ({
  color: "gray",
  "&:hover": { color: "green" },
}));
