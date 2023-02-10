import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import Image from "next/image";
import { toBase64 } from "@/utils/base64";
import { convertImage } from "@/utils/convertImage";
import { Fragment, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ItemCard = ({ menu }) => {
  const [data, setData] = useState(menu);

  const handelDelete = async (id) => {
    const delFromState = setData((prev) =>
      prev.filter((item) => item._id !== id)
    );
    const deletesAPI = await axios.delete("/api/controller/items", {
      params: { id },
    });
  };

  return data.map(
    ({
      name,
      description,
      weigth,
      image,
      persent_alcho,
      like,
      _id,
      type,
      price,
    }) => {
      return (
        <Fragment key={_id}>
          <Card sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <CardContent>
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {price} грн
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  {weigth > 0 && type === "Кухня" && (
                    <>
                      <ScaleIcon sx={{ fontSize: 12 }} />
                      <Typography sx={{ fontSize: 12 }}>{weigth}г</Typography>
                    </>
                  )}
                  {weigth > 0 && type === "Бар" && (
                    <>
                      <LocalDrinkIcon sx={{ fontSize: 12 }} />
                      <Typography sx={{ fontSize: 12 }}>{weigth}л</Typography>
                    </>
                  )}
                  {persent_alcho > 0 && type === "Бар" && (
                    <>
                      <LocalBarIcon sx={{ fontSize: 12 }} />
                      <Typography sx={{ fontSize: 12 }}>
                        {persent_alcho}%
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
            </Box>
            <Image
              src={`https://storage.googleapis.com/duplomna_photos/menuImg/${image}`}
              alt="Picture"
              width={120}
              height={90}
              style={{ borderRadius: "0.2rem" }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                convertImage(120, 90)
              )}`}
            />
          </Card>

          <CardActions>
            <Link href={`menu/${_id}`}>
              <Button size="small">Update</Button>
            </Link>
            <Button size="small" onClick={() => handelDelete(_id)}>
              Delete
            </Button>
          </CardActions>
        </Fragment>
      );
    }
  );
};

export default ItemCard;
