import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/Users";

const handle = async (req, res) => {
  dbConnect();
  try {
    const { id } = req.query;
    if (req.method === "PUT") {
      const body = req.body;
      const results = await UserModel.findByIdAndUpdate(id, body);
      res.status(201).json(results);
    } else if (req.method === "DELETE") {
      const results = await UserModel.deleteOne({ _id: id });
      res.status(201).json(results);
    }
  } catch (error) {
    console.log(error);
  }
};

export default handle;
