// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

async function findAllProducts() {
  return Menu.find({});
}

export default async function handle(req, res) {
  await dbConnect();
  const menu = await findAllProducts();
  res.status(200).json({ menu });
}
