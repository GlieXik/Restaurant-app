import { Schema, model, models } from "mongoose";

const TablesSchema = new Schema(
  {
    tableNumber: { unique: true, type: Number },
    url: String,
  },
  { versionKey: false }
);

const TablesModel = models.Tables || model("Tables", TablesSchema);
export default TablesModel;
