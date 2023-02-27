import dbConnect from "@/lib/mongodb";
import OrderModel from "@/models/Order";

dbConnect();
const hanlder = async (req, res) => {
  try {
    const { id } = req.query;
    const body = req.body;

    if (req.method === "POST") {
      await OrderModel.findByIdAndUpdate(id, body);
      res.status(201).json("changes");
    }
  } catch (e) {
    res.send(e);
  }
};

export default hanlder;
