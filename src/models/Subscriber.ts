import { Schema, Types, model, Document } from "mongoose";

export interface SubscriberDocument extends Document {
  _id: Types.ObjectId;
  userTo: Types.ObjectId;
  userFrom: Types.ObjectId;
  __v?: number;
}

const subscriberSchema = new Schema<SubscriberDocument>(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscriber = model<SubscriberDocument>("Subscriber", subscriberSchema);
export default Subscriber;
