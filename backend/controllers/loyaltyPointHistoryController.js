import LoyaltyPointHistory from "../models/LoyaltyPointHistory.js";

// Add Loyalty Point History
export const addLoyaltyPointHistory = async (req, res) => {
    try {
        const { transactionId, customerId, description, points, type } =
            req.body;
        const loyaltyPointHistory = new LoyaltyPointHistory({
            transactionId,
            customerId,
            description,
            points,
            type,
        });
        const newLoyaltyPointHistory = await loyaltyPointHistory.save();
        res.status(201).json(newLoyaltyPointHistory);
    } catch (error) {
        console.error("Error adding Loyalty Point History:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Loyalty Point History by Customer ID
export const getLoyaltyPointHistoryByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const loyaltyPointHistory = await LoyaltyPointHistory.find({
            customerId,
        });
        res.status(200).json(loyaltyPointHistory);
    } catch (error) {
        console.error("Error fetching Loyalty Point History:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
