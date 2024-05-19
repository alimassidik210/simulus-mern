import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrHy1N3yUnerkgdKGCfBtwhtewFk9-VUMjBcCJkCXszQ&s",
    },
    whatsup: {
      type: Number,
      default: 62000000,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
