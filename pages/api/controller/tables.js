import dbConnect from "@/lib/mongodb";
import TablesModel from "@/models/Tables";
import { nanoid } from "nanoid";

dbConnect();
const deleteTable = async (id) => {
  const deleteOne = await TablesModel.deleteOne({ _id: id });
  return deleteOne;
};
const addTable = async (data) => {
  try {
    const modyfyData = { ...data, url: "/" + nanoid() };
    const results = await TablesModel.create(modyfyData);
    return results;
  } catch (e) {
    return e.message;
  }
};

async function handler(req, res) {
  const { id } = req.query;
  const body = req.body;

  if (req.method === "DELETE") {
    await deleteTable(id);
    res.status(200).json("deleted");
  } else if (req.method === "POST") {
    try {
      const result = await addTable(body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  }
}
export default handler;
