import dbConnect from "@/lib/mongoose";

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
      const add = await addLike(id);
      res.status(200).send(add);
    } else if (req.method === "DELETE") {
      const del = await delLike(id);
      res.status(200).send(del);
    } else {
      res.status(405).json({ message: "Bad method" });
    }
  } catch (e) {
    res.status(500).send();
  }
}
