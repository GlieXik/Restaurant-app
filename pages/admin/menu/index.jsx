import ItemCard from "@/components/Admin/ItemCard";
import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import { Container, Fab, Grid, Paper, Toolbar } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const Menu = ({ menu }) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ItemCard menu={menu} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
export default Menu;
Menu.Layout = AdminLayout;

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
