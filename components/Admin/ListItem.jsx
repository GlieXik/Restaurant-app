import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const MainListItems = () => {
  const [role, setRole] = useState("");
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      setRole(data.user.role);
    }
  }, [data, status]);
  return (
    <>
      <Link href="/admin">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Кухня" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Бар" />
      </ListItemButton>

      {role === "admin" && (
        <>
          <Link href="/admin/menu">
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </Link>
          <Link href="/admin/people">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItemButton>
          </Link>
          <Link href="/admin/tables">
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Tables" />
            </ListItemButton>
          </Link>
          <Link href="/admin/orders">
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Замовлення" />
            </ListItemButton>
          </Link>
        </>
      )}
    </>
  );
};
