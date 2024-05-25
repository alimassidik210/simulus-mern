import mongoose, { Schema } from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    yearPublish: {
      type: Number,
      required: true,
    },
    tanggalPajak: {
      type: Number,
      required: true,
    },
    stnk: {
      type: Boolean,
      required: true,
    },
    bpkp: {
      type: Boolean,
      required: true,
    },
    pajak: {
      type: Boolean,
      required: true,
    },
    helm: {
      type: Boolean,
      required: true,
    },
    imagesUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
