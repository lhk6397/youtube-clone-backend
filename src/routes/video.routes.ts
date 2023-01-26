import express, { Router } from "express";
import {
  uploadFiles,
  // getThumbnail,
  uploadVideo,
  getVideos,
  getVideo,
  getSubscriptionVideos,
  getUserVideos,
  getWatchedVideos,
  getLikedVideo,
  updateVideo,
  deleteVideo,
  getCategorizedVideos,
  getSearchedVideos,
} from "../controller/video.controller";
// import upload from "../middleware/videoMulter";
import upload from "../middleware/videoMulter";
const router: Router = express.Router();

router.post("/uploadfiles", upload.single("file"), uploadFiles);
router.post("/uploadVideo", uploadVideo);
router.post("/updateVideo", updateVideo);
router.post("/deleteVideo", deleteVideo);
router.get("/getVideos", getVideos);
router.post("/getVideo", getVideo);
router.post("/getSubscriptionVideos", getSubscriptionVideos);
router.post("/getWatchedVideos", getWatchedVideos);
router.post("/getUserVideos", getUserVideos);
router.post("/getLikedVideo", getLikedVideo);
router.post("/getCategorizedVideos", getCategorizedVideos);
router.post("/getSearchedVideos", getSearchedVideos);

export default router;
