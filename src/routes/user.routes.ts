import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  register,
  login,
  auth,
  logout,
  getUserProfile,
  changePassword,
  uploadProfileImage,
  updateProfileImage,
} from "../controller/user.controller";
import upload from "../middleware/imageMulter";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authMiddleware, auth);
router.get("/logout", logout);
router.post("/getUserProfile", getUserProfile);
router.post("/changePassword", changePassword);
router.post("/profile");

router.post("/uploadProfileImage", upload.single("file"), uploadProfileImage);
router.post("/updateProfileImage", updateProfileImage);

export default router;
