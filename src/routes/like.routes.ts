import express, { Router } from "express";
import {
  getDislikes,
  getLikes,
  unDislike,
  unLike,
  upDislike,
  upLike,
} from "../controller/like.controller";

const router: Router = express.Router();

router.post("/getLikes", getLikes);
router.post("/getDislikes", getDislikes);
router.post("/upLike", upLike);
router.post("/unLike", unLike);
router.post("/upDisLike", upDislike);
router.post("/unDisLike", unDislike);

export default router;
