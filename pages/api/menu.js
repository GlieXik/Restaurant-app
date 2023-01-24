// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

// import connectDB from "@/lib/mongodb";

// const handler = async (req, res) => {
//   const { db } = await connectDB();

//   const menu = await db.collection("menu").find().toArray();
//   res.status(200).json({ menu });
// };
// export default handler;
async function findAllProducts() {
  return Menu.find({});
}

export default async function handle(req, res) {
  await dbConnect();
  const menu = await findAllProducts();
  res.status(200).json({ menu });
}
