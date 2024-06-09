// models/OfferPurchase.js
import mongoose from "mongoose";

const offerPurchaseSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        // Reference to the Customer model
    },
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        // Reference to the Offer model
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const OfferPurchase = mongoose.model("OfferPurchase", offerPurchaseSchema);

export default OfferPurchase;
