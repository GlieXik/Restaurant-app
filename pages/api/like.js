import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

async function addLike(id) {
  return Menu.findOneAndUpdate({ _id: id }, { $inc: { like: 1 } });
}

export default async function likeOnMongo(req, res) {
  if (req.method === "PUT") {
    await dbConnect();
    const { id } = req.query;
    const likeDel = await addLike(id);
    res.status(200).json({ status: "Ok" });
  } else {
    res.status(405).json({ message: "Bad method" });
  }
}
