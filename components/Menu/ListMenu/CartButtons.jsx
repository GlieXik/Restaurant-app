import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useSnackbar } from "notistack";
const PlusButton = ({ id }) => {
  const { addToCart, getItemQuantity, deleteFromCart, removeItemFromCart } =
    useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickPlus = () => {
    addToCart(id);
    enqueueSnackbar("Добавлено в корзину!", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
  };
  const handleClickMinus = () => {
    deleteFromCart(id);
    enqueueSnackbar("Видалено з корзини!", {
      variant: "error",
      autoHideDuration: 2000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
  };
  const handleRemove = () => {
    removeItemFromCart(id);
    enqueueSnackbar("Видалено з корзини!", {
      variant: "error",
      autoHideDuration: 2000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
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
            <IconButton variant="outlined" color="error" onClick={handleRemove}>
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );
};
export default PlusButton;
