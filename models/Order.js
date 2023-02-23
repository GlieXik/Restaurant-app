import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    tableId: Number,
    order: Array,
    payment: String,
    status: Number,
    totalPrice: Number,
  },
  { versionKey: false, timestamps: true }
);

const OrderModel = models.Orders || model("Orders", OrderSchema);

export default OrderModel;
