import mongoose, { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.VerifyToken || model("VerifyToken", tokenSchema);
