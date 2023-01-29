import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGOSSE_URI;
mongoose.set("strictQuery", true);
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  mongoose.connect(MONGODB_URI).then((mongoose) => {
    console.log("con");
    return mongoose;
  });
}

export default dbConnect;
