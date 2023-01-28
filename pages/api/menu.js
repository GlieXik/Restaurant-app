import dbConnect from "@/lib/mongoose";

export async function Connetcion() {
  await dbConnect();
}
