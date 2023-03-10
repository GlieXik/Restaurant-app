import * as React from "react";
import Avatar from "@mui/material/Avatar";


import TextField from "@mui/material/TextField";



import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const SignUp = () => {
  const router = useRouter();
  const [role, setRole] = useState("cooker");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/register", {
        name: formData.get("name"),
        email: formData.get("email").toLowerCase(),
        password: formData.get("password"),
        role: formData.get("role"),
      });
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type={"email"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-select-small">Role</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={role}
                  label="Age"
                  name="role"
                  onChange={(event) => setRole(event.target.value)}
                >
                  <MenuItem value={"admin"}>??????????</MenuItem>
                  <MenuItem value={"cooker"}>??????????</MenuItem>
                  <MenuItem value={"barman"}>????????????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            loading={loading}
            loadingIndicator="Loading???"
            variant="contained"
          >
            <span>Sign Up</span>
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
SignUp.Layout = EmptyLayout;
export default SignUp;
