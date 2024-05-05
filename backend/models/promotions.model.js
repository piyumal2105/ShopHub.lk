import mongoose from "mongoose";
const promotionsSchema = new mongoose.Schema(
  {
    promotionId: {
      type: String,
      required: true,
    },
    promotionTitle: {
      type: String,
      required: true,
    },
    promotionType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    termsNconditions: {
      type: String,
      required: true,
    },
    
  },

  { timestamps: true }
);
const Promoptions=mongoose.model("Promotions",promotionsSchema);
export default Promoptions;