import mongoose from "mongoose";

export default async function dbConnect() {
  const MONGOSSE_URI = process.env.MONGOSSE_URI;

  mongoose.set("strictQuery", true);

  mongoose.connect(MONGOSSE_URI);
}
