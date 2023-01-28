import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

async function addLike(id) {
  return Menu.findOneAndUpdate({ _id: id }, { $inc: { like: 1 } });
}
async function delLike(id) {
  return Menu.findOneAndUpdate({ _id: id }, { $inc: { like: -1 } });
}

export default async function likeOnMongo(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    if (req.method === "PUT") {
      await addLike(id);
      res.status(200).json({ status: "Ok" });
    } else if (req.method === "DELETE") {
      await delLike(id);
      res.status(200).json({ status: "Ok" });
    } else {
      res.status(405).json({ message: "Bad method" });
    }
  } catch (e) {
    res.status(500).send();
  }
}
