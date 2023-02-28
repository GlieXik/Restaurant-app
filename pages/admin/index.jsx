import Chart from "@/components/Admin/Chart";
import EarnMoney from "@/components/Admin/EarnMoney";
import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import OrderModel from "@/models/Order";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Admin = ({ suma, orders }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: 500,
                }}
              >
                <Chart orders={orders} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 150,
                }}
              >
                <EarnMoney suma={suma} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Admin;
Admin.Layout = AdminLayout;
export async function getServerSideProps(ctx) {
  try {
    await dbConnect();

    const results = await OrderModel.find({ status: 3 });
    const suma = results.reduce((acc, value) => {
      return acc + value.totalPrice;
    }, 0);

    return {
      props: {
        orders: JSON.parse(JSON.stringify(results)),
        suma: suma.toLocaleString(),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
