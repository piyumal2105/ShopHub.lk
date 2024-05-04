import mongoose from "mongoose";

const rvwSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const RVW = mongoose.model("RVW", rvwSchema);

export default RVW;