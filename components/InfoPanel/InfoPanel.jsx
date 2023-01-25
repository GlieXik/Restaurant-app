import { FavoriteBorder } from "@mui/icons-material";
import { Box, Icon, IconButton, Link, styled, Typography } from "@mui/material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PhoneIcon from "@mui/icons-material/Phone";
const IconStyled = styled(Icon)(({ theme }) => ({
  borderRadius: 1,
  marginRight: theme.spacing(2),
  color: "rgba(0, 0, 0, 0.54)",
}));
const InfoPanel = () => {
  return (
    <>
      <Typography>Інформація про заклад</Typography>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          margin={1}
          sx={{ maxWidth: 250 }}
        >
          <IconStyled>
            <QueryBuilderIcon></QueryBuilderIcon>
          </IconStyled>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">Робочий час:</Typography>
            <Typography>9:00-22:00</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          margin={1}
          sx={{ maxWidth: 250 }}
        >
          <IconStyled>
            <MyLocationIcon></MyLocationIcon>
          </IconStyled>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">Адреса:</Typography>
            <Typography>вулиця Руська 43</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          margin={1}
          sx={{ maxWidth: 250 }}
        >
          <IconStyled>
            <PhoneIcon></PhoneIcon>
          </IconStyled>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">Телефон:</Typography>
            <Typography>
              <Link href="tel:+380994820346" underline="none" color="inherit">
                +380 (99) 482-03-46
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default InfoPanel;
