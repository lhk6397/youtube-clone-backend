import Video from "../models/Video";
import Subscriber from "../models/Subscriber";
import { Types } from "mongoose";
import View from "../models/View";
import Like from "../models/Like";
import Comment from "../models/Comment";
import Dislike from "../models/Dislike";
import { asyncFunc } from "../types/types";
import User from "../models/User";
import { uploadVideoToCLD } from "../middleware/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export const uploadFiles: asyncFunc = async (req, res) => {
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await uploadVideoToCLD(dataURI);
    if (cldRes) {
      const thumbnail = cloudinary.url(cldRes.publicId + ".jpg", {
        resource_type: "video",
        transformation: { height: 240, width: 320, crop: "fill" },
      });
      return res.json({
        success: true,
        filePath: cldRes.path,
        fileName: cldRes.publicId,
        thumbnail,
        duration: cldRes.duration,
      });
    }
  }
  return res.json({ success: false });
};

export const uploadVideo: asyncFunc = async (req, res) => {
  try {
    const video = new Video(req.body);

    await video.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const updateVideo: asyncFunc = async (req, res) => {
  try {
    const {
      title,
      description,
      privacy,
      filePath,
      category,
      duration,
      thumbnail,
    } = req.body;

    await Video.findByIdAndUpdate(
      req.body.videoId,
      {
        title,
        description,
        privacy,
        filePath,
        category,
        duration,
        thumbnail,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const getVideos: asyncFunc = async (req, res) => {
  try {
    const videos = await Video.find().populate("writer");
    return res.status(200).json({ success: true, videos });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getVideo: asyncFunc = async (req, res) => {
  try {
    const video = await Video.findOne({ _id: req.body.videoId }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, video });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getSubscriptionVideos: asyncFunc = async (req, res) => {
  try {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection
    const subscribers = await Subscriber.find({ userFrom: req.body.userFrom });
    let subscribedUser: Types.ObjectId[] = [];
    subscribers.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });

    //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
    const videos = await Video.find({
      writer: { $in: subscribedUser },
    }).populate("writer");
    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getUserVideos: asyncFunc = async (req, res) => {
  try {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection
    const videos = await Video.find({ writer: req.body.userId }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getWatchedVideos: asyncFunc = async (req, res) => {
  try {
    let uniqueViews: Types.ObjectId[] = [];
    await View.aggregate(
      [
        {
          $group: { _id: "$userId", watchedVideos: { $addToSet: "$videoId" } },
        },
      ],
      function (rr, ra: any[]) {
        if (ra) {
          for (let i = 0; i < ra.length; i++) {
            if (ra[i]._id == req.body.userId) {
              uniqueViews = ra[i].watchedVideos;
            }
          }
        }
      }
    );
    const videos = await Video.find({
      _id: { $in: uniqueViews },
    }).populate("writer");

    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getLikedVideo: asyncFunc = async (req, res) => {
  try {
    const likes = await Like.find({
      userId: req.body.userId,
      videoId: { $ne: null },
    });

    const likedVideos: any[] = [];
    likes.map((like) => likedVideos.push(like.videoId));

    const videos = await Video.find({
      _id: { $in: likedVideos },
    }).populate("writer");

    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const deleteVideo: asyncFunc = async (req, res) => {
  try {
    const { videoId, fileName } = req.body;
    await cloudinary.uploader.destroy(fileName, {
      invalidate: true,
      resource_type: "video",
    });
    await Video.findByIdAndDelete(videoId);
    // Comments, Likes, views 삭제
    const comments = await Comment.find({ videoId });
    await Comment.deleteMany({ videoId });
    let commentIdx: Types.ObjectId[] = [];
    comments.map((comment, i) => {
      commentIdx.push(comment._id);
    });

    await Like.deleteMany({
      $or: [{ videoId }, { commentId: { $in: commentIdx } }],
    });
    await Dislike.deleteMany({
      $or: [{ videoId }, { commentId: { $in: commentIdx } }],
    });
    await View.deleteMany({ videoId });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getCategorizedVideos: asyncFunc = async (req, res) => {
  try {
    const categorizedVideos = await Video.find({
      category: req.body.category,
    }).populate("writer");
    return res.status(200).json({ success: true, categorizedVideos });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getSearchedVideos: asyncFunc = async (req, res) => {
  try {
    const regex = new RegExp(req.body.search, "i");
    let userIds: Types.ObjectId[] = [];
    const users = await User.find({ username: { $regex: regex } });
    users.map((user) => {
      userIds.push(user._id);
    });
    const searchedVideos = await Video.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { writer: { $in: userIds } },
      ],
    }).populate("writer");
    return res.status(200).json({ success: true, searchedVideos });
  } catch (err) {
    return res.status(400).send(err);
  }
};
