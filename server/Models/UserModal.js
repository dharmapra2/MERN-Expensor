import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  user_email: { type: String, required: [true, "Email is required"] },
  user_name: { type: String, required: [true, "User name is required"] },
  user_pwd: {
    type: String,
    required: [true, "Password is required"],
    min: [6, "Password must be minimum of 6 character"],
    max: 12,
  },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model("User", UserSchema);
