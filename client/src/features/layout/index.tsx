import { useState } from "react";
// mui
import Toolbar from "@mui/material/Toolbar";
// react router
import { Outlet } from "react-router-dom";

// custom components
import { Sidebar } from "@features/sidebar/components";
import { Topbar } from "@features/topbar/component";
import { Toast } from "@common/components";
// custom styles
import { StyledMain, StyledAppLayout, StyledMainContent } from "./styles";
import { useSocket } from "@common/hooks";

export function AppLayout() {
  const [openSideBar, setOpenSidebar] = useState(true);
  // initialize socket
  const { socket } = useSocket();

  return (
    <StyledAppLayout>
      {/* sidebar is not in normal document flow */}
      <Sidebar open={openSideBar} setOpen={setOpenSidebar} />
      {/* topbar is not in normal document flow */}
      <Topbar open={openSideBar} setOpen={setOpenSidebar} />
      <StyledMain open={openSideBar}>
        {/* keep gap at top using toolbar */}
        <Toolbar />
        {/* align main contents to page center */}
        <StyledMainContent>
          <Outlet />
        </StyledMainContent>
      </StyledMain>
      <Toast />
    </StyledAppLayout>
  );
}
