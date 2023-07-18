import express from "express";

import {
  getAllLogs,
  createLog,
  deleteLog,
} from "../controller/LogController.js";

const router = express.Router();

//ROUTES
router.route("/logs").get(getAllLogs).post(createLog).delete(deleteLog);

export default router;
