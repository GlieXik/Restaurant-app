const { Schema, model, models } = require("mongoose");

const MenuSchema = new Schema({
  category: String,
  description: String,
  image: String,
  like: Number,
  name: String,
  persent_alcho: Number,
  price: Number,
  type: String,
  weigth: Number,
});

export default models.Menu || model("Menu", MenuSchema);
