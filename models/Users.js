import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "cooker",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 5);
});

const UserModel = models.Users || model("Users", userSchema);
export default UserModel;
