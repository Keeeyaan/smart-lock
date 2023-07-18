import { db } from "../config/database.js";

//GET ALL LOGS
const getAllLogs = (req, res) => {
  const sql = "SELECT * FROM logs";

  db.query(sql, (err, results) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(results);
  });
};

//CREATE LOG
const createLog = (req, res) => {
  const { date, message } = req.body;

  if (!date || !message) {
    return res.status(400).send("Empty fields!");
  }

  const sql = `INSERT INTO logs(date, message) VALUES('${date}', '${message}')`;

  db.query(sql, (err, results) => {
    console.log(err);
    if (err) return res.status(500).json(err);
    if (results.length !== 0) {
      res.status(200).json({ message: "Logs Created!" });
    } else {
      res.status(404).send([]);
    }
  });
};

//DELETE LOG
const deleteLog = (req, res) => {
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

export { getAllLogs, createLog, deleteLog };
