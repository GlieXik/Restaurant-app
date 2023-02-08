import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
export const config = { api: { bodyParser: false } };

export const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/imagesTest");
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
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/imagesTest"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/imagesTest"));
  }
  await readFile(req, true);
  res.json({ status: "ok" });
};
export default handler;
