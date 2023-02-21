import { Box, Container, Fab, Grid, Paper } from "@mui/material";
import PeopleSettings from "@/components/Admin/PeopleSettings";
import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import AddIcon from "@mui/icons-material/Add";
import UserModel from "@/models/Users";
import Link from "next/link";
import { useState } from "react";
const People = ({ users }) => {
  const [data, setData] = useState(users);

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
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {data.map((user) => {
                    return (
                      <PeopleSettings
                        key={user._id}
                        user={user}
                        setData={setData}
                      />
                    );
                  })}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Link href="/signup">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

export default People;
People.Layout = AdminLayout;

export async function getServerSideProps(ctx) {
  try {
    await dbConnect();

    const results = await UserModel.find();

    return {
      props: {
        users: JSON.parse(JSON.stringify(results)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
