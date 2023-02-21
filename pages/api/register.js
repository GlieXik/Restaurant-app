import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/Users";

const register = async (req, res) => {
  if (req.method === "POST") {
    dbConnect();
    const user = await UserModel.create(req.body);
    res.status(201).json({ user });
  }
};
export default register;
