import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

export async function findAllProducts() {
  return Menu.find({});
}

export default async function handle(req, res) {
  await dbConnect();
  const menu = await findAllProducts();
  res.status(200).json({ menu });
}
