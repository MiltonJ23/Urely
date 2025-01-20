import {Suspense, useEffect} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
//import StickyFooter from "./components/StickyFooter";
import { router } from "./router";
//import { themeOptions } from "./themeOptions";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useThemeStore } from "./store/themeStore";
import useTokenHandler from "./components/removeToken";


//const Theme = createTheme(themeOptions);

export default function App() {
  const { theme } = useThemeStore();
  const { initializeInterceptor, snackbarComponent } = useTokenHandler();

  useEffect(() => {
    initializeInterceptor(); // Initialize Axios interceptor
  }, []);


  return (
    <ThemeProvider theme={createTheme(theme)}>
      {snackbarComponent}
      <CssBaseline />
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
      >
        <RouterProvider router={router} />
        {/* <StickyFooter /> */}
      </Suspense>
    </ThemeProvider>
  );
}
