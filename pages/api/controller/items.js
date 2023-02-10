import dbConnect from "@/lib/mongodb";
import MenuModel from "@/models/Menu";

async function deleteItem(id) {
  const results = await MenuModel.deleteOne({ _id: id });

  return results;
}
async function updateItem(id, update) {
  const results = await MenuModel.findByIdAndUpdate(id, update);
  return results;
}
export async function addItem(data) {
  const results = await MenuModel.create(data);
  return results;
}

export default async function itemsCrud(req, res) {
  await dbConnect();
  const { id } = req.query;
  const body = req.body;

  try {
    if (req.method === "DELETE") {
      await deleteItem(id);
      res.status(202).json({ message: "deleted" });
    } else if (req.method === "PUT") {
      await updateItem(id, body);
      res.status(201).json({ message: "updated" });
    } else {
      res.status(405).json({ message: "Bad method" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
