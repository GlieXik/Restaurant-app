import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState, useContext } from "react";
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
      await axios
        .put(`/api/like?id=${id}`)
        .then(console.log)
        .catch((e) => console.log(e));
    } else {
      setLikes(likes - 1);
      setSelectedLikes((prev) => prev.filter((item) => item !== id));
      await axios.delete(`/api/like?id=${id}`).then(console.log);
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
