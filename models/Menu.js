import { Schema, model, models } from "mongoose";

const MenuSchema = new Schema({
  name: String,
  category: String,
  description: String,
  image: String,
  like: Number,
  persent_alcho: Number,
  price: Number,
  weigth: Number,
  type: String,
});

const MenuModel = models.Menu || model("Menu", MenuSchema);
export default MenuModel;
