import { CartContextProvider } from "@/components/CartContext";
import { Layout } from "@/components/Layout/Layout";
import { LikedContextProvider } from "@/components/LikedContext";
import { SearchContextProvider } from "@/components/SearchContext";

import "@/styles/globals.scss";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
let theme = createTheme({
  typography: {
    fontSize: 13,
    allVariants: {
      color: "#303030",
    },
  },
});
theme = responsiveFontSizes(theme);
export default function App({ Component, pageProps }) {
  const LayoutExtra = Component.Layout || Layout;

  return (
    <>
      <SearchContextProvider>
        <SnackbarProvider maxSnack={3}>
          <LikedContextProvider>
            <CartContextProvider>
              <ThemeProvider theme={theme}>
                <LayoutExtra {...pageProps}>
                  <Component {...pageProps} />
                </LayoutExtra>
              </ThemeProvider>
            </CartContextProvider>
          </LikedContextProvider>
        </SnackbarProvider>
      </SearchContextProvider>
    </>
  );
}
