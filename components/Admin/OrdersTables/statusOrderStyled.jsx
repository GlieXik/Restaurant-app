import { Box } from "@mui/material";

export const CircleIcon = ({ stan }) => {
  const colors = () => {
    switch (stan) {
      case 0:
        return "white";
      case 1:
        return "orange";
      case 2:
        return "green";
      case 3:
        return "yellow";
      default:
        break;
    }
  };
  return (
    <Box
      sx={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        backgroundColor: colors(),
        borderRadius: "50%",
        border: "2px solid #252525",
      }}
    ></Box>
  );
};
