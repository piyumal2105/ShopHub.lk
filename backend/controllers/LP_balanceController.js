import LP_balance from "../models/LP_balance.js";

export const getBalance = async (req, res) => {
    try {
        const { customerId } = req.params;
        const balance = await LP_balance.findOne({ customerId }); // Use findOne instead of findById
        if (!balance) {
            return res.status(404).json({ message: "LP_balance not found" });
        }
        res.status(200).json(balance);
    } catch (error) {
        console.error("Error fetching LP_balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBalance = async (req, res) => {
    try {
        const { customerId } = req.params;
        const updatedBalance = await LP_balance.findOneAndUpdate(
            { customerId },
            req.body,
            {
                new: true,
            }
        );
        if (!updatedBalance) {
            return res.status(404).json({ message: "LP_balance not found" });
        }
        res.status(200).json({
            message: "LP_balance updated successfully",
            LP_balance: updatedBalance,
        });
    } catch (error) {
        console.error("Error updating LP_balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createBalance = async (req, res) => {
    try {
        const { customerId, balance } = req.body;
        const newBalance = new LP_balance({
            customerId,
            balance,
        });
        await newBalance.save();
        res.status(201).json({
            message: "LP_balance created successfully",
            LP_balance: newBalance,
        });
    } catch (error) {
        console.error("Error creating LP_balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
