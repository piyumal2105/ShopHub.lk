import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Free Delivery", "Discount"], required: true },
    discountAmount: { type: Number },
    priceInPoints: { type: Number, required: true },
    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
});

const offer = mongoose.model("Offer", offerSchema);

export default offer;
