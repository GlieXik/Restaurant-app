import { Schema, model, models } from "mongoose";

const TablesSchema = new Schema({
  tables: Array,
});

const TablesModel = models.Tables || model("Tables", TablesSchema);
export default TablesModel;
