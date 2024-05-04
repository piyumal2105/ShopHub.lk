import OfferPurchase from "../models/OfferPurchase.js";

export const createOfferPurchase = async (req, res) => {
    try {
        const { customerId, offerId, date } = req.body;
        const newOfferPurchase = new OfferPurchase({
            customerId,
            offerId,
            date,
        });
        await newOfferPurchase.save();
        res.status(201).json({
            message: "Offer purchase created successfully",
            offerPurchase: newOfferPurchase,
        });
    } catch (error) {
        console.error("Error creating offer purchase:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOfferPurchase = async (req, res) => {
    try {
        const offerPurchase = await OfferPurchase.findById(
            req.params.offerPurchaseId
        );
        if (!offerPurchase) {
            return res
                .status(404)
                .json({ message: "Offer purchase not found" });
        }
        res.status(200).json(offerPurchase);
    } catch (error) {
        console.error("Error fetching offer purchase:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
