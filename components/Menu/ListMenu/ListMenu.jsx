import { Box, List } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import ScaleIcon from "@mui/icons-material/Scale";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import Image from "next/image";
import { nanoid } from "nanoid";
import { Fragment } from "react";

import { Element } from "react-scroll";
import Like from "./Like";
import filteByMenu from "@/utils/filterByMenuCategotyes";

const ListMenu = ({ menu }) => {
  const convertImage = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const renderMenu = (datas) => {
    return datas.map(({ category, data }) => (
      <Fragment key={nanoid()}>
        <Element name={category}>
          <List
            component="div"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 20, fontWeight: "600", color: "#303030" }}
            >
              {category}
            </Typography>
          </List>
        </Element>

        {data.map(
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

                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        mb: 1.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        "-webkit-line-clamp": "2",
                        "-webkit-box-orient": "vertical",
                      }}
                    >
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
                          <Typography sx={{ fontSize: 12 }}>
                            {weigth}г
                          </Typography>
                        </>
                      )}
                      {weigth > 0 && type === "Бар" && (
                        <>
                          <LocalDrinkIcon sx={{ fontSize: 12 }} />
                          <Typography sx={{ fontSize: 12 }}>
                            {weigth}л
                          </Typography>
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
          }
        )}
      </Fragment>
    ));
  };
  return <>{renderMenu(filteByMenu(menu))}</>;
};

export default ListMenu;
