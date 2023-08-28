
import React from "react";
// mui
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// custom style
import { StyledSidebarToggle } from "./styles";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarToggle({ setOpen }: Props) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyledSidebarToggle aria-label="sidebar-toggle">
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </StyledSidebarToggle>
  );
}
