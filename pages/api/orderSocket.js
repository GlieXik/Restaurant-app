import OrderModel from "@/models/Order";
import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    const io = new Server(res.socket.server);
    console.log("Socket is initializing");

    io.on("connection", (socket) => {
      socket.broadcast.emit("connected");
      const changeStream = OrderModel.watch();
      changeStream.on("change", (change) => {
        console.log(change.operationType);
        if (change.operationType === "insert") socket.emit("change", change);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
