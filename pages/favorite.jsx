import { LikedContext } from "@/components/LikedContext";
import Loader from "@/components/Loader/Loader";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
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

  return (
    <>
      <Grid
        container
        sx={{ mt: 1, justifyContent: "center" }}
        columnSpacing={3}
        rowSpacing={1}
      >
        <Grid md={6} xs={12} item>
          {filterFavoriteMenu() > 0 ? (
            <ListMenu menu={filterFavoriteMenu()}></ListMenu>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h1">А ну ЛАЙКАЙ!</Typography>
              <Link href="/">
                <IconButton>
                  <ArrowBackIcon fontSize="large" />
                  <Typography>На головну</Typography>
                </IconButton>
              </Link>
            </Box>
          )}
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
