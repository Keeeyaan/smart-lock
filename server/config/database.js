import mysql from "mysql2";

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "smart-lock-db",
};

export const db = mysql.createConnection(config);
