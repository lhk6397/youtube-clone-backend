import { Schema, Types, model, Document } from "mongoose";

export interface LikeDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  commentId: Types.ObjectId;
  videoId: Types.ObjectId;
  __v?: number;
}

const likeSchema = new Schema<LikeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
  },
  { timestamps: true }
);

const Like = model<LikeDocument>("Like", likeSchema);
export default Like;
