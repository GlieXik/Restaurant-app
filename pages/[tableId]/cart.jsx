import Loader from "@/components/Loader/Loader";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import { useContext } from "react";

import Nav from "@/components/Nav/Nav";
import { CartContext } from "@/components/CartContext";
import { SearchContext } from "@/components/SearchContext";
import { useRouter } from "next/router";
import axios from "axios";

import TablesModel from "@/models/Tables";

const ListMenu = dynamic(() => import("@/components/Menu/ListMenu/ListMenu"), {
  loading: () => <Loader></Loader>,
  ssr: false,
});

const Cart = ({ menu, table }) => {
  const { cart } = useContext(CartContext);
  const { searchValue } = useContext(SearchContext);
  const router = useRouter();

  const filterCart = () => {
    const cartItems = [];
    menu.map((item) => {
      cart.map((e) => {
        if (e.id === item._id) {
          return cartItems.push(item);
        }
      });
    });
    return cartItems;
  };

  const totalPrice = cart.reduce((accumulator, menuItem) => {
    const item = menu.find((i) => {
      return i._id === menuItem.id;
    });

    return accumulator + (item?.price || 0) * menuItem.quantity;
  }, 0);

  const filteredMenuBySearch = filterCart().filter((item) => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const onCash = async () => {
    const order = {
      tableId: table.tableNumber,
      order: cart,
      payment: "Готівка",
      status: 0,
      totalPrice,
    };
    const { data } = await axios.post("/api/controller/order/orders", {
      ...order,
    });
  };
  const onCard = async () => {
    const order = {
      tableId: table.tableNumber,
      order: cart,
      payment: "Карта",
      status: 0,
      totalPrice,
    };
    const { data } = await axios.post("/api/controller/order/orders", {
      ...order,
    });
  };
  return (
    <>
      <Grid
        container
        sx={{ mt: 1, justifyContent: "center" }}
        columnSpacing={2}
        rowSpacing={1}
      >
        <Grid md={6} xs={12} item>
          <>
            <Nav title="Корзина"></Nav>

            {filterCart().length === 0 ? (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4">Пусто</Typography>
              </Box>
            ) : (
              <>
                <ListMenu menu={filteredMenuBySearch}></ListMenu>
                <Card
                  sx={{
                    padding: 2,
                  }}
                >
                  <Typography variant="h6">
                    До оплати {totalPrice} грн
                  </Typography>
                  <Box sx={{ paddingY: 1 }}>
                    <Button
                      variant="outlined"
                      sx={{ marginBottom: 1 }}
                      fullWidth={true}
                      onClick={onCash}
                    >
                      Готівка
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth={true}
                      onClick={onCard}
                    >
                      Карта
                    </Button>
                  </Box>
                </Card>
              </>
            )}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;

export async function getServerSideProps({ query }) {
  try {
    await dbConnect();

    const results = await MenuModel.find({});
    const table = await TablesModel.findOne({
      url: "/" + query.tableId,
    });
    const sortMenu = results.sort((a, b) => (a.category > b.category ? 1 : -1));
    return {
      props: {
        menu: JSON.parse(JSON.stringify(sortMenu)),
        table: JSON.parse(JSON.stringify(table)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
