import { Box, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
const PlusButton = ({ id }) => {
  const { cart, setCart, addToCart, getItemQuantity, deleteFromCart } =
    useContext(CartContext);

  const handleClickPlus = () => {
    addToCart(id);
  };
  const handleClickMinus = () => {
    deleteFromCart(id);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton onClick={handleClickPlus} size="small" aria-label="add">
          <AddIcon></AddIcon>
        </IconButton>
        {getItemQuantity(id) > 0 && (
          <>
            {getItemQuantity(id)}
            <IconButton
              onClick={handleClickMinus}
              size="small"
              aria-label="minus"
            >
              <RemoveIcon></RemoveIcon>
            </IconButton>
          </>
        )}
      </Box>
    </>
  );
};
export default PlusButton;
