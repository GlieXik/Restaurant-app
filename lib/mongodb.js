import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {});
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}
console.log("conn");
export default clientPromise;
