// controllers/prizeController.js
import Prize from "../models/Prize.js";

export const addPrize = async (req, res) => {
    try {
        const { customerId, prizeWon } = req.body;
        const prize = new Prize({ customerId, prizeWon });
        await prize.save();
        res.status(201).json({ message: "Prize added successfully" });
    } catch (error) {
        console.error("Error adding prize:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
