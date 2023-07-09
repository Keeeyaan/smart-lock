import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";
import MemberRoutes from "./routes/MemberRoute.js";

import serialLogic from "./serial-logic.js";

const PORT = process.env.PORT || 8000;
const app = express();

const myPort = new SerialPort({ path: "COM6", baudRate: 9600 });
const parser = myPort.pipe(new ReadlineParser({ delimiter: "\n" }));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", MemberRoutes);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

myPort.on("open", () => {
  console.log("Serial port open");
  // setInterval(() => myPort.write("lock"), 2000);
  // myPort.write("lock");
});

io.on("connection", (socket) => {
  serialLogic(io, socket, parser, myPort);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
