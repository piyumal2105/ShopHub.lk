import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    prizeWon: {
        type: String,
        required: true,
    },
    spunAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Prize = mongoose.model("Prize", prizeSchema);

export default Prize;
