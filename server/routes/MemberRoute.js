import express from "express";
import {
  getAllMembers,
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

export default router;
