// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const StyledAddProject = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 1.5),
}));

export const StyledAddProjectButton = styled(IconButton)(() => ({
  color: "gray",
  "&:hover": { color: "green" },
}));
