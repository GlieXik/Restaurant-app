import { Layout } from "@/components/Layout/Layout";
// import { LikedContextProvider } from "@/components/LikedContext";
import "@/styles/globals.scss";
// import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
// let theme = createTheme({
//   typography: {
//     fontSize: 13,
//     allVariants: {
//       color: "#303030",
//     },
//   },
// });
// theme = responsiveFontSizes(theme);
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <LikedContextProvider> */}
      {/* <ThemeProvider theme={theme}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ThemeProvider> */}
      {/* </LikedContextProvider> */}
    </>
  );
}
