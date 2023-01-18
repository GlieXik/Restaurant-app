import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { Menu } from "@/components/Menu/Menu";
export default function Home({ menu }) {
  return (
    <>
      <Head>
        <title>Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Menu menu={menu}></Menu>
      <main></main>
    </>
  );
}
export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.BASE_SITE}/api/menu`);
  const menu = data.menu;

  return {
    props: { menu },
  };
}
