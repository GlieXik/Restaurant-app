// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "@/lib/mongodb";

const handler = async (req, res) => {
  const { db } = await connectDB();

  const menu = await db.collection("menu").find().toArray();
  res.status(200).json({ menu });
};
export default handler;
