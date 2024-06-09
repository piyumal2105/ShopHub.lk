import mongoose from "mongoose";

const lpBalanceSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const LP_balance = mongoose.model("LP_balance", lpBalanceSchema);

export default LP_balance;
