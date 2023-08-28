// mui
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import { DRAWERWIDTH } from "@common/utils/constants";

/** Appbar */
interface Props extends AppBarProps {
  open?: boolean;
}

export const StyledAppbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWERWIDTH}px)`,
    marginLeft: `${DRAWERWIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
