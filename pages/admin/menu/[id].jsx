import AdminLayout from "@/components/Layout/AdminLayout";
import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";
import { toBase64 } from "@/utils/base64";
import { convertImage } from "@/utils/convertImage";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Updete = ({ item }) => {
  const [type, setType] = useState(item.type);

  const router = useRouter();
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const newData = {
      name: data.get("name"),
      category: data.get("category"),
      type: data.get("type"),
      price: data.get("price"),
      description: data.get("description"),
      weigth: data.get("weigth"),
      persent_alcho: data.get("persent_alcho"),
    };

    await axios.put(`/api/controller/items?id=${item._id}`, newData);
    router.back();
  };

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
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": {
                    marginY: 1,
                    width: "100%",
                  },
                  "& .MuiFormControl-root": {
                    marginY: 1,
                  },

                  display: "flex",
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Назва"
                  name="name"
                  defaultValue={item.name}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Категорія"
                  name="category"
                  defaultValue={item.category}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      name="type"
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Кухня"}>Кухня</MenuItem>
                      <MenuItem value={"Бар"}>Бар</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    id="outlined-number"
                    label="Ціна"
                    type="number"
                    name="price"
                    defaultValue={item.price}
                  />
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Опис"
                  multiline
                  rows={5}
                  name="description"
                  defaultValue={item.description}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    id="outlined-number"
                    label="Вага"
                    type="number"
                    name="weigth"
                    defaultValue={item.weigth}
                  />
                  <TextField
                    id="outlined-number"
                    label="Процент алкоголю"
                    type="number"
                    name="persent_alcho"
                    defaultValue={item.persent_alcho}
                  />
                </Box>

                <Image
                  src={`https://storage.googleapis.com/duplomna_photos/menuImg/${item.image}`}
                  alt="Picture"
                  width={120}
                  height={90}
                  style={{ borderRadius: "0.2rem" }}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    convertImage(120, 90)
                  )}`}
                />
              </Box>
              <Button variant="contained" type="submit">
                Підтвердити
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Updete;
Updete.Layout = AdminLayout;

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();

    const results = await MenuModel.findById(params.id);

    return {
      props: {
        item: JSON.parse(JSON.stringify(results)),
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
