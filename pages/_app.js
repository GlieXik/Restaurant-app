import { CartContextProvider } from "@/components/CartContext";
import { Layout } from "@/components/Layout/Layout";
import { LikedContextProvider } from "@/components/LikedContext";
import { SearchContextProvider } from "@/components/SearchContext";

import "@/styles/globals.scss";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import Head from "next/head";

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
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Restaurant</title>
      </Head>
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
