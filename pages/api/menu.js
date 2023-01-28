import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

export async function findAllProducts() {
  await dbConnect();
  return Menu.find({});
}

export default async function handle(req, res) {
  const menu = await findAllProducts();
  res.status(200).json({ menu });
}
