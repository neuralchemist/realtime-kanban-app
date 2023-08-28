// mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// custom constants
import { DRAWERWIDTH } from "@common/utils/constants";

export const StyledAppLayout = styled(Box)(() => ({
  display: "flex",
  height: "100vh",

  // -----DEBUG--------
  // border: "2px solid gray",
}));

export const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // -------CLOSED----------
  /* pushes sidebar outside view port */
  marginLeft: `-${DRAWERWIDTH}px`,
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // -------OPEN---------
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create(["margin", "display"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    // Mobile
    [theme.breakpoints.down("sm")]: {
      marginLeft: `-${DRAWERWIDTH}px`,
    },
  }),

  // -----DEBUG--------
  // border: "2px dashed green",
}));

export const StyledMainContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  // -----DEBUG--------
  // border: "1px dashed yellow",
}));
