import dbConnect from "@/lib/mongoose";
import Menu from "@/model/Menu";

export async function findAllProducts() {
  return Menu.find({});
}
