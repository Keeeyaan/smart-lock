import fs from "fs";
import path from "path";
import { db } from "../config/database.js";

//GET ALL STUDENTS
const getAllMembers = (req, res) => {
  const sql = "SELECT * FROM members";

  db.query(sql, (err, results) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(results);
  });
};

//GET MEMBER BY RFID
const getMemberByRFID = (req, res) => {
  const {rfid} = req.params;
  const sql = `SELECT * FROM members WHERE uid = '${rfid}'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(results);
  });
};

//CREATE STUDENT
const createMember = (req, res) => {
  const { rfid, name, image } = req.body;

  if (!rfid || !name) {
    return res.status(400).send("Empty fields!");
  }

  let sql = `INSERT INTO members(rfid, name) VALUES('${rfid}', '${name}')`;

  if (image) {
    const imagename = `${name.trim()}_${Date.now()}.jpg`;
    if (!fs.existsSync("./client/public/image")) {
      fs.mkdirSync("./client/public/image");
    }

    //cleanup the image base64 format
    const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(
      path.join(`./client/public/image/${imagename}`),
      Buffer.from(base64Data, "base64")
    );
    sql = `INSERT INTO members(uid, name, image) VALUES('${rfid}', '${name}', '${imagename}')`;
  }

  db.query(sql, (err, results) => {
    console.log(err);
    if (err) return res.status(500).json(err);
    if (results.length !== 0) {
      res.status(200).json({ message: "User Created!" });
    } else {
      res.status(404).send([]);
    }
  });
};

//UPDATE STUDENT
const updateMember = (req, res) => {
  const { id, username, password } = req.body;

  const sql = `UPDATE members set username= '${username}', password = '${password}' WHERE id = '${id}'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length !== 0) {
      res.status(200).json({ message: "User Updated!" });
    } else {
      res.status(404).send([]);
    }
  });
};

//DELETE STUDENT
const deleteMember = (req, res) => {
  const { id } = req.body;

  const sql = `DELETE FROM members WHERE id = '${id}'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length !== 0) {
      res.status(200).send("User Deleted!");
    } else {
      res.status(404).send([]);
    }
  });
};

//LOGIN
// const loginUser = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(500).send('Username and password are required!');
//   }

//   const sql = `SELECT * FROM members WHERE username = '${username}' AND password = '${password}'`;

//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     if (results.length !== 0) {
//       res.status(200).json(results[0]);
//     } else {
//       res.status(400).send([]);
//     }
//   });
// };

export { getAllMembers, getMemberByRFID, createMember, updateMember, deleteMember };
