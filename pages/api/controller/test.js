const parseForm = async (form, req) => {
  return await new Promise(async (resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default parseForm;
