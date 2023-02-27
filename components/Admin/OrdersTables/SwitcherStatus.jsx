import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import { useEffect, useState } from "react";

const SwitcherStatus = ({ id, stan }) => {
  const [alignment, setAlignment] = useState(stan);
  useEffect(() => {
    setAlignment(stan);
  }, [stan]);
  const handleChange = async (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const { data } = await axios.post(
        "/api/controller/changeStan",
        { status: newAlignment },
        {
          params: { id },
        }
      );
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={0}>0</ToggleButton>
      <ToggleButton value={1}>1</ToggleButton>
      <ToggleButton value={2}>2</ToggleButton>
      <ToggleButton value={3}>3</ToggleButton>
    </ToggleButtonGroup>
  );
};
export default SwitcherStatus;
