import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, {versionKey: false});

export const DaoUser = mongoose.model("User", UserSchema);