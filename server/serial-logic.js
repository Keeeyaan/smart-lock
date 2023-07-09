import { db } from "./config/database.js";

const initializeSerial = (io, socket, parser, myPort) => {
  console.log("a user connect", socket.id);

  parser.on("data", (data) => {
    if (data.includes("UID")) {
      const arrData = data.split(": ");
      const UID = arrData[1].replace("\r", "  ");
      socket.emit("received-id", UID);

      //  Check the rfid in the database
      db.query(`SELECT * FROM members WHERE uid = '${UID}'`, (err, results) => {
        console.log(results);
        if (results.length !== 0) {
          myPort.write("granted");
        } else {
          myPort.write("denied");
        }
      });
    } else if (data.includes("Access")) {
      const arrData = data.split(": ");
      const access = arrData[1].replace("\r", " ");
      socket.emit("received-access", access);
    } else if (data.includes("Status")) {
      const arrData = data.split(": ");
      const lockStatus = arrData[1].replace("\r", " ");
      socket.emit("received-lock-status", lockStatus);
    } else {
      console.log(data);
    }
  });

  socket.on("lock", () => {
    myPort.write("lock");
  });

  socket.on("unlock", () => {
    myPort.write("unlock");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnect", socket.id);
  });
};

export default initializeSerial;
