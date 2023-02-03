import { LikedContext } from "@/components/LikedContext";
import Loader from "@/components/Loader/Loader";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import { useContext } from "react";

import Nav from "@/components/Nav/Nav";
const ListMenu = dynamic(() => import("@/components/Menu/ListMenu/ListMenu"), {
  loading: () => <Loader></Loader>,
  ssr: false,
});
const Favorite = ({ menu }) => {
  const { selectedLikes } = useContext(LikedContext);

  const filterFavoriteMenu = () => {
    const favoriteMenu = [];
    menu.map((item) => {
      selectedLikes.map((id) => {
        if (id === item._id) return favoriteMenu.push(item);
      });
    });
    return favoriteMenu;
  };
  const favoriteList = filterFavoriteMenu();
  return (
    <>
      <Grid
        container
        sx={{ mt: 1, justifyContent: "center" }}
        columnSpacing={3}
        rowSpacing={1}
      >
        <Grid md={6} xs={12} item>
          <>
            <Nav title="Вподобані"></Nav>
            <ListMenu menu={favoriteList}></ListMenu>
            {favoriteList.length === 0 && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4">Пусто</Typography>
              </Box>
            )}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Favorite;

export async function getServerSideProps(ctx) {
  try {
    await dbConnect();

    const results = await MenuModel.find({});
    const sortMenu = results.sort((a, b) => (a.category > b.category ? 1 : -1));
    return {
      props: {
        menu: JSON.parse(JSON.stringify(sortMenu)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
