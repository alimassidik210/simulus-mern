import User from "../models/model.user.js";
import Listing from "../models/model.listing.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "API is Working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "anda hanya bisa mengupdate akun anda saja"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          whatsup: req.body.whatsup,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(
        errorHandler(401, "anda hanya boleh menghapus akun milik anda")
      );
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("akun anda telah terhapus");
  } catch (error) {
    next(error);
  }
};

export const userListings = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } else {
      next(errorHandler(403, "Kamu hanya bisa melihat listing dari akunmu"));
    }
  } catch (error) {
    next(error);
  }
};
