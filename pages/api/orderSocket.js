import OrderModel from "@/models/Order";

import dbConnect from "@/lib/mongodb";

dbConnect();

const Handler = async (req, res) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  res.status(200).json(orders);
};

export default Handler;
