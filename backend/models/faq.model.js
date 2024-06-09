import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question_no: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ;