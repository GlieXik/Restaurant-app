// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import connectDB from "@/lib/mongodb";

// const handler = async (req, res) => {
//   const { db } = await connectDB();

//   const category = await db.collection("menu").aggregate([{ $match: "Кухня" }]);
//   res.status(200).json({ category });
// };
// export default handler;
