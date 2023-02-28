import Typography from "@mui/material/Typography";

export default function EarnMoney({ suma }) {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="p" variant="h4">
        {suma} &#8372;
      </Typography>
    </>
  );
}
