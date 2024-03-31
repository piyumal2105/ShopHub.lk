import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OfferForm = () => {
    const [offerData, setOfferData] = useState({
        name: "",
        type: "Free Delivery",
        discountAmount: 0,
        priceInPoints: 0,
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the value is negative or zero and if it's discountAmount or priceInPoints
        if (
            (name === "discountAmount" || name === "priceInPoints") &&
            (parseFloat(value) <= 0 || isNaN(parseFloat(value)))
        ) {
            setErrorMessage("Value must be a positive number.");
            return;
        } else {
            setErrorMessage(""); // Reset error message if value is valid
        }

        setOfferData({ ...offerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/offers/create",
                offerData
            );
            console.log("Offer created:", response.data);

            toast.success("Offer created successfully", {
                position: "top-center",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: true, // Hide progress bar
                className: "toast-success",
            });
        } catch (error) {
            console.error("Error creating offer:", error);
            // Handle error state
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Offer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Offer Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={offerData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Offer Type:
                    </label>
                    <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={offerData.type}
                        onChange={handleChange}
                    >
                        <option value="Free Delivery">Free Delivery</option>
                        <option value="Discount">Discount</option>
                    </select>
                </div>
                {offerData.type === "Discount" && (
                    <div className="mb-3">
                        <label htmlFor="discountAmount" className="form-label">
                            Discount Amount:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="discountAmount"
                            name="discountAmount"
                            value={offerData.discountAmount}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="priceInPoints" className="form-label">
                        Price in Loyalty Points:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceInPoints"
                        name="priceInPoints"
                        value={offerData.priceInPoints}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">
                    Create Offer
                </button>
            </form>
            <ToastContainer />{" "}
            {/* Toast container for displaying toast messages */}
        </div>
    );
};

export default OfferForm;
