import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
  Button,
} from "@mui/material";

import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const PeopleSettings = ({ user, setData }) => {
  const [role, setRole] = useState(user.role);
  const [showSub, setShowSub] = useState(false);
  useEffect(() => {
    if (role !== user.role) {
      setShowSub(true);
    } else {
      setShowSub(false);
    }
  }, [user.role, role]);
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleClick = async () => {
    const { data } = await axios.put(`/api/role?id=${user._id}`, { role });
    setShowSub(false);
  };
  const handleClickDel = async () => {
    try {
      setData((prev) => prev.filter((e) => e._id !== user._id));
      const { data } = await axios.delete(`/api/role?id=${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Paper
        sx={{
          p: 1,
          width: 140,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography textAlign="center">{user.name}</Typography>
        <FormControl sx={{ my: 1 }} size="small" fullWidth>
          <InputLabel id="demo-select-small">Role</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={role}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"admin"}>Адмін</MenuItem>
            <MenuItem value={"cooker"}>Кухар</MenuItem>
            <MenuItem value={"barman"}>Бармен</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex">
          <IconButton color="error" onClick={handleClickDel}>
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </IconButton>
          {showSub && <Button onClick={handleClick}>Submit</Button>}
        </Box>
      </Paper>
    </>
  );
};

export default PeopleSettings;
