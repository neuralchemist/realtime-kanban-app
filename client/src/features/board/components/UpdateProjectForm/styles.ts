
// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";


export const StyledUpdateProjectForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  //   ----DEBUG----
    // border: "1px solid pink",
}));

export const StyledButtonSection = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  //   ----DEBUG----
  // border: "1px solid yellow",
}));
