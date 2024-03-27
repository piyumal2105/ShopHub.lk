import Offer from "../models/Offer.js";

export const createOffer = async (req, res) => {
    try {
        const { name, type, discountAmount, priceInPoints, status } = req.body;
        const newOffer = new Offer({
            name,
            type,
            discountAmount,
            priceInPoints,
            status,
        });
        await newOffer.save();
        res.status(201).json({
            message: "Offer created successfully",
            offer: newOffer,
        });
    } catch (error) {
        console.error("Error creating offer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
