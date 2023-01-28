import Head from "next/head";

import axios from "axios";
import { Menu } from "@/components/Menu/Menu";
import Grid from "@mui/material/Grid";
import { Box, ListSubheader, Paper, styled } from "@mui/material";
import ListMenu from "@/components/Menu/ListMenu/ListMenu";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import dbConnect from "@/lib/mongoose";
import { findAllProducts } from "./api/menu";

const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    position: "sticky",
    top: 80,
    alignSelf: "start",
  },
}));
export default function Home({ menu }) {
  return (
    <>
      <Head>
        <title>Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <Grid container sx={{ mt: 1 }} columnSpacing={3} rowSpacing={1}>
          <GridStyled md={3} xs={12} item>
            <Menu menu={menu}></Menu>
          </GridStyled>
          <Grid md={6} xs={12} item>
            <ListMenu menu={menu}></ListMenu>
          </Grid>
          <GridStyled md={3} xs={12} item>
            <InfoPanel></InfoPanel>
          </GridStyled>
        </Grid>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  try {
    await dbConnect();
    const menu = await findAllProducts();

    return {
      props: { menu: JSON.parse(JSON.stringify(menu)) },
    };
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return {
      notFound: true,
    };
  }
}
