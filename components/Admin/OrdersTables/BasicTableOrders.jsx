import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Typography } from "@mui/material";
import statusOrder from "@/utils/statusOrder";
const BasicTable = ({ orders }) => {
  const paymentIcon = (method) => {
    if (method === "Готівка") {
      return <AccountBalanceWalletIcon></AccountBalanceWalletIcon>;
    } else if (method === "Карта") {
      return <CreditCardIcon></CreditCardIcon>;
    } else {
      return;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Стіл</TableCell>
            <TableCell>Страви</TableCell>
            <TableCell>Стан</TableCell>
            <TableCell>Оплата</TableCell>
            <TableCell>Ціна</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tableId}
              </TableCell>
              <TableCell>
                {row.order.map((items, index) => {
                  return (
                    <Typography key={index}>
                      {items.quantity} - {items.id}
                    </Typography>
                  );
                })}
              </TableCell>
              <TableCell>{statusOrder(row.status)}</TableCell>
              <TableCell>{paymentIcon(row.payment)}</TableCell>
              <TableCell>{row.totalPrice} грн</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BasicTable;
