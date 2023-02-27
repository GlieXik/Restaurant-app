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
import { CircleIcon } from "@/components/Admin/OrdersTables/statusOrderStyled";
import SwitcherStatus from "./SwitcherStatus";
const CookersTable = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Стіл</TableCell>
            <TableCell>Страви</TableCell>
            <TableCell>Стан</TableCell>
            <TableCell>Контроль</TableCell>
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
              <TableCell>
                <CircleIcon stan={row.status} />
              </TableCell>
              <TableCell>
                <SwitcherStatus id={row._id} stan={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CookersTable;
