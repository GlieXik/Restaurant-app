import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

let cachedClient;
let cachedDB;
const connectDB = async () => {
  if (cachedClient && cachedDB) {
    return {
      client: cachedClient,
      db: cachedDB,
    };
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI false");
  }
  if (!MONGO_DB) {
    throw new Error("MONGO_DB false");
  }
  let client = new MongoClient(MONGO_URI);
  await client.connect();
  let db = client.db(MONGO_DB);
  cachedClient = client;
  cachedDB = db;

  return {
    client: cachedClient,
    db: cachedDB,
  };
};
export default connectDB;
