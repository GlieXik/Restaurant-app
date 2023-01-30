// import clientPromise from "@/lib/mongodb";
import MenuModel from "@/models/Menu";

async function addLike(id) {
  const results = await MenuModel.findOneAndUpdate(
    { _id: id },
    { $inc: { like: 1 } },
    {
      new: true,
    }
  );

  return results;
}
async function delLike(id) {
  const results = await MenuModel.findOneAndUpdate(
    { _id: id },
    { $inc: { like: -1 } },
    {
      new: true,
    }
  );

  return results;
}

export default async function likeOnMongo(req, res) {
  try {
    const { id } = req.query;

    if (req.method === "PUT") {
      const add = await addLike(id);

      res.status(200).json(add);
    } else if (req.method === "DELETE") {
      const del = await delLike(id);
      res.status(200).json(del);
    } else {
      res.status(405).json({ message: "Bad method" });
    }
  } catch (e) {
    res.status(500).send();
  }
}
