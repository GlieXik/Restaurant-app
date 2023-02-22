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
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/router";
import { useState } from "react";

const Add = () => {
  const [type, setType] = useState("Кухня");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const uploadPhoto = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;
    const formData = new FormData(e.target);
    formData.append("myImage", selectedFile);

    const data = await axios.post("/api/addPhoto", formData);
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
                    label="Відсоток алкоголю"
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
                {selectedImage ? (
                  <Image src={selectedImage} alt="" width={120} height={80} />
                ) : (
                  <span>Select Image</span>
                )}
                <Button variant="contained" type="submit">
                  Підтвердити
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Add;
Add.Layout = AdminLayout;
