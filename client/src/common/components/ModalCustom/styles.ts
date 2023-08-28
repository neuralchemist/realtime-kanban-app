// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StyledModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: theme.palette.background.paper,
  //   border: "1px solid gray",
  borderRadius: theme.spacing(1),
  boxShadow: "24px",
  padding: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    width: "320px",
  },
}));
