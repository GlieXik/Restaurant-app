import { Box, IconButton, Typography, Tooltip, Zoom } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";

import QRCode from "qrcode.react";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
const TableControll = ({ tables, setTablesState }) => {
  const [baseUrl, setBaseUrl] = useState(null);

  const componentRef = useRef(null);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const hanleDelete = async (id) => {
    const { data } = axios.delete(`/api/controller/tables`, { params: { id } });
    setTablesState((prev) => prev.filter((e) => e._id !== id));
  };
  return (
    <>
      {tables.map((item) => {
        return (
          <Box
            display={"flex"}
            alignItems="center"
            key={item._id}
            gap={1}
            marginBottom={2}
          >
            <Typography marginRight={1}>{item.tableNumber}.</Typography>
            <Box ref={componentRef}>
              <QRCode value={baseUrl + item.url} size={100} />
            </Box>

            <Box>
              <Tooltip title="Copy" arrow>
                <IconButton
                  variant="outlined"
                  onClick={() =>
                    navigator.clipboard.writeText(baseUrl + item.url)
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Print" arrow>
                <IconButton variant="outlined" onClick={handlePrint}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                variant="outlined"
                color="error"
                onClick={() => hanleDelete(item._id)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default TableControll;
