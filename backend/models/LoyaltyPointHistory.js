import mongoose from "mongoose";

const loyaltyPointHistorySchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["earn", "redeem"],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const LoyaltyPointHistory = mongoose.model(
    "LoyaltyPointHistory",
    loyaltyPointHistorySchema
);

export default LoyaltyPointHistory;
