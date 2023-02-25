import React, { useContext, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { CartContext } from "../CartContext";
import { useRouter } from "next/router";

function SuccessModal(props) {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const { setCart } = useContext(CartContext);
  const handleClose = () => {
    setOpen(false);
    console.log(router);
    router.push("/" + router.query.tableId);

    setCart([]);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Покупка успішно завершена!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Дякуємо за Вашу покупку!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessModal;
