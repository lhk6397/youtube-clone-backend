import express, { Router } from "express";
import { getViews, updateView } from "../controller/view.controller";

const router: Router = express.Router();

router.post("/getViews", getViews);
router.post("/updateView", updateView);

export default router;
