// mui
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
// custom utils
import { DRAWERWIDTH } from "@common/utils/constants";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWERWIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DRAWERWIDTH,
    boxSizing: "border-box",
    backgroundColor: "#242424",
  },
}));
