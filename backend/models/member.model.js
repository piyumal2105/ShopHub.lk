import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    cusMemberID: {
      type: "string",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    shop: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    category: {
      type: String,
    },
    otherCategory: {
      type: String,
    },
    userRole: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "REQUESTED",
    },
    password: {
      type: String,
      default: "",
    },
    initialPasswordReset: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("members", memberSchema);

export default Member;
