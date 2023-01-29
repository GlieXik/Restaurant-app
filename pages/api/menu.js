import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("duplomna");
    const collection = db.collection("menus");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
