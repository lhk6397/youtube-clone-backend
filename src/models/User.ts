import mongoose, { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  avatarUrl?: string;
  password: string;
  role: number;
  subscriber: number;
  __v?: number;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    maxlength: 50,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  avatarUrl: String,
});

const saltRounds = 12;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const User = model<UserDocument>("User", userSchema);

export default User;
