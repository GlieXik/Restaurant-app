import mongoose from "mongoose";

const MONGOSSE_URI = process.env.MONGOSSE_URI;

export default async function dbConnect() {
  mongoose.connect(MONGOSSE_URI);
}
