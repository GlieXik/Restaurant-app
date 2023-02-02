import { Container } from "@mui/material";
import Header from "./Header";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export const Layout = ({ children, menu }) => {
  return (
    <>
      <Container fixed className={roboto.className}>
        <Header menu={menu}></Header>
        {children}
        <footer>Foot</footer>
      </Container>
    </>
  );
};
