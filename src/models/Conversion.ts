import mongoose, { Schema } from "mongoose";
import { ConverData } from "../interfaces";


const ConvertSchema = new  Schema<ConverData>({
    params: {
        type: JSON,
        required: true,
    },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
}, {versionKey: false});
export const DaoConver = mongoose.model("Conver", ConvertSchema);