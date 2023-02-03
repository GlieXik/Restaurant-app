import { Container } from "@mui/material";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const Admin = () => {
  return <>Amin</>;
};
export default Admin;
Admin.getLayout = function PageLayout(page) {
  return (
    <>
      <Container fixed className={roboto.className}>
        {page}
      </Container>
    </>
  );
};
