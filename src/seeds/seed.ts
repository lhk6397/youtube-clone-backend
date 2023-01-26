import mongoose from "mongoose";
import connect from "../db";
import Comment from "../models/Comment";
import Dislike from "../models/Dislike";
import Like from "../models/Like";
import Subscriber from "../models/Subscriber";
import User from "../models/User";
import Video from "../models/Video";
import View from "../models/View";

const seedDB = async () => {
  await connect();
  await User.deleteMany({});
  await Video.deleteMany({});
  await View.deleteMany({});
  await Subscriber.deleteMany({});
  await Comment.deleteMany({});
  await Like.deleteMany({});
  await Dislike.deleteMany({});
};

seedDB().then(() => {
  mongoose.connection.close();
});
