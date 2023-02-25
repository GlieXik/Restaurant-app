import BasicTable from "@/components/Admin/OrdersTables/BasicTableOrders";
import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import OrderModel from "@/models/Order";

import { Container, Grid, Paper } from "@mui/material";

import { useEffect, useState } from "react";
import io from "socket.io-client";

// import dynamic from "next/dynamic";

// const SocketIOClient = dynamic(() => import("socket.io-client"), {
//   ssr: false,
// });
let socket;
const AllOrders = ({ orders, menu }) => {
  const [ordersState, setOrdersState] = useState(orders);

  const socketInitializer = async () => {
    await fetch("/api/orderSocket");
    socket = io();
    socket.on("connected", () => {
      console.log("connected");
    });
    socket.on("change", (e) => {
      console.log(e.fullDocument);
      setOrdersState((prev) => [...prev, e.fullDocument]);
    });
    return null;
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const renameIds = menu.map((item) => {
    ordersState.map((order) => {
      order.order.map((e) => {
        if (item._id === e.id) {
          e.id = item.name;
        }
      });
    });
  });

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
              <BasicTable orders={ordersState}></BasicTable>
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
    const results = await OrderModel.find();

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
