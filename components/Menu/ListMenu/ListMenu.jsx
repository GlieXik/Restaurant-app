import { Box, ListSubheader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import ScaleIcon from "@mui/icons-material/Scale";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import Image from "next/image";
import { nanoid } from "nanoid";
import { Fragment } from "react";
import filterMenu from "@/lib/filterMenu";

import { Element } from "react-scroll";

const ListMenu = ({ menu }) => {
  menu.sort((a, b) => (a.category > b.category ? 1 : -1));

  const renderMenu = (datas) => {
    return datas.map(({ category, data }) => (
      <Fragment key={nanoid()}>
        <Element name={category}>
          <ListSubheader
            component="div"
            sx={{
              fontSize: 20,
              fontWeight: "600",
              color: "black",
              paddingLeft: 1,
              paddingRight: 1,
              marginBottom: 1,
            }}
          >
            {category}
          </ListSubheader>
        </Element>

        {data.map(({ name, description, weigth, image, persent_alcho }) => {
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
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    {description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    {weigth && (
                      <>
                        <ScaleIcon sx={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 12 }}>{weigth}г</Typography>
                      </>
                    )}
                    {persent_alcho > 0 && (
                      <>
                        <LocalBarIcon sx={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 12 }}>
                          {persent_alcho}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Image
                    src={image}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Fragment>
    ));
  };

  return <>{renderMenu(filterMenu(menu))}</>;
};

export default ListMenu;
