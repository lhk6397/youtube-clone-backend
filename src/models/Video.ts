import { Schema, Types, model, Document } from "mongoose";

export interface VideoDocument extends Document {
  _id: Types.ObjectId;
  writer: Types.ObjectId;
  title: string;
  description: string;
  privacy: string;
  filePath: string;
  category: string;
  duration: string;
  thumbnail: string;
  createdAt: number;
  fileName: string;
  __v?: number;
}

const videoSchema = new Schema<VideoDocument>({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  privacy: {
    type: String,
  },
  filePath: {
    type: String,
  },
  category: String,
  duration: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  fileName: String,
});

const Video = model<VideoDocument>("Video", videoSchema);
export default Video;
