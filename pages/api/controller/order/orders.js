import dbConnect from "@/lib/mongodb";
import OrderModel from "@/models/Order";

dbConnect();

const handler = async (req, res) => {
  try {
    const body = req.body;

    if (req.method === "POST") {
      const results = await OrderModel.create(body);
      res.status(201).json(results);
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
