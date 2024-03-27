// frontend/src/components/OfferForm.jsx
import React, { useState } from "react";
import axios from "axios";

const OfferForm = () => {
    const [offerData, setOfferData] = useState({
        name: "",
        type: "Free Delivery",
        discountAmount: 0,
        priceInPoints: 0,
    });

    const handleChange = (e) => {
        setOfferData({ ...offerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/offers/create",
                offerData
            );
            console.log("Offer created:", response.data);
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error("Error creating offer:", error);
            // Handle error state
        }
    };

    return (
        <div>
            <h2>Create Offer</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Offer Name:
                    <input
                        type="text"
                        name="name"
                        value={offerData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Offer Type:
                    <select
                        name="type"
                        value={offerData.type}
                        onChange={handleChange}
                    >
                        <option value="Free Delivery">Free Delivery</option>
                        <option value="Discount">Discount</option>
                    </select>
                </label>
                {offerData.type === "Discount" && (
                    <label>
                        Discount Amount:
                        <input
                            type="number"
                            name="discountAmount"
                            value={offerData.discountAmount}
                            onChange={handleChange}
                        />
                    </label>
                )}
                <label>
                    Price in Loyalty Points:
                    <input
                        type="number"
                        name="priceInPoints"
                        value={offerData.priceInPoints}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Create Offer</button>
            </form>
        </div>
    );
};

export default OfferForm;
