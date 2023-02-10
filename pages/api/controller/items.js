import MenuModel from "@/models/Menu";
import { Storage } from "@google-cloud/storage";

async function deleteItem(id) {
  const results = await MenuModel.deleteOne({ _id: id });

  return results;
}
async function updateItem(id, update) {
  const results = await MenuModel.findByIdAndUpdate(id, update, {
    new: true,
  });
  return results;
}
async function addItem(data) {
  const results = await MenuModel.create(data);
  return results;
}
export default async function itemsCrud(req, res) {
  const { id } = req.query;
  const body = req.body;

  try {
    if (req.method === "DELETE") {
      await deleteItem(id);
      res.status(202).json({ message: "deleted" });
    } else if (req.method === "PUT") {
      await updateItem(id, body);
      res.status(201).json({ message: "updated" });
    } else if (req.method === "POST") {
      const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        },
      });

      const bucket = storage.bucket(process.env.BUCKET_NAME);
      const file = bucket.file(req.query.file);

      const options = {
        expires: Date.now() + 1 * 60 * 1000, //  1 minute,
        fields: { "x-goog-meta-test": "data" },
      };

      const [response] = await file.generateSignedPostPolicyV4(options);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      res.status(200).json(response);
    } else {
      res.status(405).json({ message: "Bad method" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
