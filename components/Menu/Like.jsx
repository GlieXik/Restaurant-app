import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState, useMemo, useContext } from "react";
import { LikedContext } from "../LikedContext";
import axios from "axios";

const Like = ({ id, like }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(like);

  const { selectedLikes, setSelectedLikes } = useContext(LikedContext);
  useEffect(() => {
    if (selectedLikes.length === 0) {
      return;
    }

    setLiked(selectedLikes.includes(id));
  }, [id, selectedLikes]);

  const handleLike = async () => {
    if (!liked) {
      setLikes(likes + 1);
      setSelectedLikes((prev) => [...prev, id]);
      await axios.put(`http://localhost:3000/api/like?id=${id}`);
    } else {
      setLikes(likes - 1);
      setSelectedLikes((prev) => prev.filter((item) => item !== id));
    }
    setLiked(!liked);
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <IconButton sx={{ borderRadius: 1 }} onClick={handleLike}>
          {liked ? (
            <FavoriteIcon></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon></FavoriteBorderIcon>
          )}

          <Typography marginLeft={1}>{likes}</Typography>
        </IconButton>
      </Stack>
    </>
  );
};
export default Like;
