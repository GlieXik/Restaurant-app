import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function dbConnect() {
  mongoose.connect(MONGO_URI);
}
