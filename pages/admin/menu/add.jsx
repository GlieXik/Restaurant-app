import AdminLayout from "@/components/Layout/AdminLayout";

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

import { useRouter } from "next/router";
import { useState } from "react";

const Add = () => {
  const [type, setType] = useState("Кухня");

  const router = useRouter();
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/controller/items?file=${filename}`, {
      method: "POST",
    });
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    // const newData = {
    //   name: data.get("name"),
    //   category: data.get("category"),
    //   type: data.get("type"),
    //   price: data.get("price"),
    //   description: data.get("description"),
    //   weigth: data.get("weigth"),
    //   persent_alcho: data.get("persent_alcho"),
    // };
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
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Категорія"
                  name="category"
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
                  />
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Опис"
                  multiline
                  rows={5}
                  name="description"
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
                  />
                  <TextField
                    id="outlined-number"
                    label="Процент алкоголю"
                    type="number"
                    name="persent_alcho"
                  />
                </Box>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    onChange={uploadPhoto}
                    id="upload-photo"
                    name="image"
                    type="file"
                    accept="image/jpeg"
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    Upload button
                  </Button>
                </label>
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

export default Add;
Add.Layout = AdminLayout;
