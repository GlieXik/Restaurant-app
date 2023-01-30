// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }
// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, {});
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, {});
//   clientPromise = client.connect();
// }
// console.log("conn");
// export default clientPromise;

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("mong con");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
