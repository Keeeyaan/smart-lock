import express from "express";

import {
  getAllMembers,
  getMemberByRFID,
  createMember,
  updateMember,
  deleteMember,
} from "../controller/MemberController.js";

const router = express.Router();

//ROUTES
router
  .route("/members")
  .get(getAllMembers)
  .post(createMember)
  .put(updateMember)
  .delete(deleteMember);

  router.route("/members/:rfid").get(getMemberByRFID);
export default router;
