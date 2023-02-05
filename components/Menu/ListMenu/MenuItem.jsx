import { Box, Card, CardContent, Typography } from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import Like from "./Like";
import Image from "next/image";
import { nanoid } from "nanoid";
import { convertImage } from "@/utils/convertImage";
import { toBase64 } from "@/utils/base64";
import { useState } from "react";
const MenuItem = ({ item }) => {
  const {
    name,
    description,
    weigth,
    image,
    persent_alcho,
    like,
    _id,
    type,
    price,
  } = item;

  const [openText, setOpenText] = useState(false);
  const handleToggle = () => setOpenText(!openText);
  return (
    <Card
      key={nanoid()}
      sx={{
        marginBottom: 2,
        ":nth-last-of-type(1)": { marginBottom: 0 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgb(255, 161, 27)" }}
              gutterBottom
            >
              {price} грн
            </Typography>
            <Box onClick={handleToggle}>
              {openText ? (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    mb: 1.5,
                    overflow: "hidden",
                    display: "-webkit-box",

                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {description}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    mb: 1.5,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>
          </Box>
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
                <Typography sx={{ fontSize: 12 }}>{persent_alcho}%</Typography>
              </>
            )}
          </Box>
          <Like like={like} id={_id}></Like>
        </Box>

        <Box>
          <Image
            src={image}
            alt="Picture"
            width={120}
            height={90}
            style={{ borderRadius: "0.2rem" }}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(120, 90)
            )}`}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
export default MenuItem;
