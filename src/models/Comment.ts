import { Schema, Types, model, Document } from "mongoose";

export interface CommentDocument extends Document {
  _id: Types.ObjectId;
  writer: Types.ObjectId;
  videoId: Types.ObjectId;
  responseTo: Types.ObjectId;
  content: string;
  createdAt: number;
  __v?: number;
}

const commentSchema = new Schema<CommentDocument>({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Comment = model<CommentDocument>("Comment", commentSchema);
export default Comment;
