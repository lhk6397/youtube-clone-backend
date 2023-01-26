import { Schema, Types, model, Document } from "mongoose";

export interface ViewDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  videoId: Types.ObjectId;
  __v?: number;
}

const viewsSchema = new Schema<ViewDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
  },
  { timestamps: true }
);

const View = model<ViewDocument>("View", viewsSchema);
export default View;
