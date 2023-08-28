// mui
import Divider from "@mui/material/Divider";
// custom component
import { AddProjectSection } from "../AddProjectSection";
import { SidebarToggle } from "../SidebarToggle";
import { ProjectList } from "..";
// custom styles
import { StyledDrawer } from "./styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ open, setOpen }: Props) {
  return (
    <StyledDrawer
      aria-label="sidebar-drawer"
      variant="persistent"
      anchor="left"
      open={open}
    >
      <SidebarToggle setOpen={setOpen} />
      <Divider />
      <AddProjectSection />
      <ProjectList />
    </StyledDrawer>
  );
}
