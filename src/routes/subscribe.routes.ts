import express, { Router } from "express";
import {
  getSubscribeNumber,
  subscribe,
  unsubscribe,
  getSubscribedInfo,
  getSubscribedUser,
} from "../controller/subscribe.controller";

const router: Router = express.Router();

router.post("/subscribeNumber", getSubscribeNumber);
router.post("/subscribed", getSubscribedInfo);
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.post("/getSubscribedUser", getSubscribedUser);

export default router;
