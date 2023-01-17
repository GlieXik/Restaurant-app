import Head from "next/head";
import Image from "next/image";
import axios from "axios";
export default function Home() {
  return (
    <>
      <Head>
        <title>Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <h1>Hi</h1>
      </main>
    </>
  );
}
export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`/api/menu`);
  console.log(data.menu);

  return {
    props: {},
  };
}
