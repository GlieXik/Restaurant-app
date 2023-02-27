import BasicTable from "@/components/Admin/OrdersTables/BasicTableOrders";
import CookersTable from "@/components/Admin/OrdersTables/CookersTableOrders";
import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import OrderModel from "@/models/Order";

import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";

const AllOrders = ({ orders, menu }) => {
  const [ordersState, setOrdersState] = useState(orders);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios("/api/orderSocket");

      setOrdersState(res.data);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renameIds = (orders) => {
    menu.map((item) => {
      orders.map((order) => {
        order.order.map((e) => {
          if (item._id === e.id) {
            e.id = item.name;
          }
        });
      });
    });
  };

  renameIds(ordersState);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} md={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CookersTable orders={ordersState}></CookersTable>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export async function getServerSideProps(ctx) {
  try {
    await dbConnect();

    const menu = await MenuModel.find();

    const results = await OrderModel.find().sort({ createdAt: -1 });

    return {
      props: {
        menu: JSON.parse(JSON.stringify(menu)),
        orders: JSON.parse(JSON.stringify(results)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}

export default AllOrders;
AllOrders.Layout = AdminLayout;
