import formidable from "formidable";
import { Storage } from "@google-cloud/storage";
import { addItem } from "./controller/items";
export const config = { api: { bodyParser: false } };
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

export const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    // options.uploadDir = path.join(process.cwd(), "/public/imagesTest");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  const { fields, files } = await readFile(req, true);
  fields["image"] = files.myImage.newFilename;
  await addItem(fields);

  const options = {
    destination: "menuImg/" + files.myImage.newFilename,
    preconditionOpts: { ifGenerationMatch: 0 },
  };

  await storage
    .bucket(process.env.BUCKET_NAME)
    .upload(files.myImage.filepath, options);
  console.log(
    `${files.myImage.filepath} uploaded to ${process.env.BUCKET_NAME}`
  );
  res.json({ status: "ok" });
};
export default handler;
