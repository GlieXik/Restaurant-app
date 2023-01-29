import Head from "next/head";

import { MenuCom } from "@/components/Menu/Menu";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import ListMenu from "@/components/Menu/ListMenu/ListMenu";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
// import dbConnect from "@/lib/mongoose";
import clientPromise from "@/lib/mongodb";

import Menu from "@/models/Menu";
import axios from "axios";
import { fetching } from "@/utils/fetch";

const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    position: "sticky",
    top: 80,
    alignSelf: "start",
  },
}));
const Home = ({ menu }) => {
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
            <MenuCom menu={menu}></MenuCom>
          </GridStyled>
          {/* <Grid md={6} xs={12} item>
            <ListMenu menu={menu}></ListMenu>
          </Grid> */}
          <GridStyled md={3} xs={12} item>
            <InfoPanel></InfoPanel>
          </GridStyled>
        </Grid>
      </main>
    </>
  );
};
export const getServerSideProps = async (ctx) => {
  try {
    const mongoClient = await clientPromise;
    // const res = await fetching("api/menu");
    const db = mongoClient.db("duplomna");
    const collection = db.collection("menus");
    const results = await collection.find({}).toArray();

    return {
      props: { menu: JSON.parse(JSON.stringify(results)) },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
export default Home;
