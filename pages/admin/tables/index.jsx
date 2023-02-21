import TableControll from "@/components/Admin/TableControll";

import AdminLayout from "@/components/Layout/AdminLayout";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TablesModel from "@/models/Tables";
import dbConnect from "@/lib/mongodb";
import { useState } from "react";
import axios from "axios";
const TablesPage = ({ tables }) => {
  const [tablesState, setTablesState] = useState(tables);

  const [value, setValue] = useState("");
  const handleAddTable = async () => {
    const { data } = await axios.post("/api/controller/tables", {
      tableNumber: value,
    });

    setTablesState((prev) => [...prev, data]);
  };

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
                <Box>
                  <Typography>Столи</Typography>
                  {tablesState && (
                    <TableControll
                      tables={tablesState}
                      setTablesState={setTablesState}
                    />
                  )}
                </Box>
                <Box padding={3}>
                  <TextField
                    variant="outlined"
                    type="number"
                    size="small"
                    value={value}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                    sx={{ width: 90 }}
                  />
                  <IconButton onClick={handleAddTable}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await dbConnect();

    const table = await TablesModel.find({});

    return {
      props: {
        tables: JSON.parse(JSON.stringify(table)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
TablesPage.Layout = AdminLayout;
export default TablesPage;
