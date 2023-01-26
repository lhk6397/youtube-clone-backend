import Comment from "../models/Comment";
import { asyncFunc } from "../types/types";

export const saveComment: asyncFunc = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    const foundComment = await Comment.find({ _id: comment._id }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, foundComment });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getComments: asyncFunc = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, comments });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const deleteComment: asyncFunc = async (req, res) => {
  try {
    await Comment.findOneAndDelete({ _id: req.body._id });
    await Comment.deleteMany({ responseTo: req.body._id });
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

export const updateComment: asyncFunc = async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.body.commentId },
      { content: req.body.content },
      { new: true }
    );
    return res.json({ success: true, updatedComment });
  } catch (err) {
    return res.json({ success: false, err });
  }
};
