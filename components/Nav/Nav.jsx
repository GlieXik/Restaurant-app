const { Box, Typography, IconButton } = require("@mui/material");

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const Nav = ({ title = "Title" }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        paddingY: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        sx={{ position: "absolute", left: 0 }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};
export default Nav;
