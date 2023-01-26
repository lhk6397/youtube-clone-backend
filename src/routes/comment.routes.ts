import express, { Router } from "express";
import {
  deleteComment,
  getComments,
  saveComment,
  updateComment,
} from "../controller/comment.controller";

const router: Router = express.Router();

router.post("/saveComment", saveComment);
router.post("/getComments", getComments);
router.post("/deleteComment", deleteComment);
router.post("/updateComment", updateComment);

export default router;
