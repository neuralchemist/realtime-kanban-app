import { useState } from "react";
// mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseLine from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
// react router dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// custom components
import { AppLayout } from "@common/components";
// custom pages
import {
  EmptyProjectPage,
  LoginPage,
  ProjectDetailPage,
  SignupPage,
} from "@pages/index";
import { HOME, PROJECTDETAIL, PROJECTS, SIGNUP } from "@common/utils/routes";
// custom theme
import { darkTheme, ligtTheme } from "@common/utils/theme";
import { ToastProvider } from "@common/context";

// Create a rect query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: Infinity,
    },
  },
});

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark" ? darkTheme : ligtTheme),
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <CssBaseLine />
          <BrowserRouter>
            <Routes>
              <Route path={HOME} element={<AppLayout />}>
                <Route index element={<LoginPage />} />
                <Route path={SIGNUP} element={<SignupPage />} />
                <Route path={PROJECTS} element={<EmptyProjectPage />} />
                <Route path={PROJECTDETAIL} element={<ProjectDetailPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
