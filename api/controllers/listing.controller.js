import Listing from "../models/model.listing.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      next(errorHandler(404, "listing tidak ditemukan"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const listing = await Listing.find();
    if (!listing) {
      next(errorHandler(404, "listing tidak ditemukan"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, "listing tidak ditemukan"));
  }

  if (req.user.id !== listing.userRef) {
    next(errorHandler("401", "ini bukan listing akun mu"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("listing berhasil dihapus");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    next(errorHandler(404, "listing tidak ditemukan"));
  }

  if (req.user.id !== listing.userRef) {
    next(errorHandler("401", "ini bukan listing akun mu"));
  }
  try {
    const updateList = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateList);
  } catch (error) {
    next(error);
  }
};
