import { Schema, Types, model, Document } from "mongoose";

export interface DislikeDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  commentId: Types.ObjectId;
  videoId: Types.ObjectId;
  __v?: number;
}

const dislikeSchema = new Schema<DislikeDocument>(
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

const Dislike = model<DislikeDocument>("Dislike", dislikeSchema);
export default Dislike;
