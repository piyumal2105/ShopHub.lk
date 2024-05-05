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

export const getOffer = async (req, res) => {
    try {
        const offer = await Offer.find();
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json(offer);
    } catch (error) {
        console.error("Error fetching offer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const updatedOffer = await Offer.findByIdAndUpdate(offerId, req.body, {
            new: true,
        });
        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({
            message: "Offer updated successfully",
            offer: updatedOffer,
        });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const deletedOffer = await Offer.findByIdAndDelete(offerId);
        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        console.error("Error deleting offer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
