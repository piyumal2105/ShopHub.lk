import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OfferForm from "./OfferForm"; // Assuming OfferForm component is imported correctly

const LP_admin = () => {
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [activeOffers, setActiveOffers] = useState([]);
    const { offerID } = useParams();

    useEffect(() => {
        fetchActiveOffers();
    }, []);

    const fetchActiveOffers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/offers/getoffer`
            );
            // Filter active offers before setting state
            const filteredOffers = response.data.filter(
                (offer) => offer.status === "Active"
            );
            setActiveOffers(filteredOffers);
        } catch (error) {
            console.error("Error fetching active offers:", error);
        }
    };

    const toggleOfferForm = () => {
        setShowOfferForm(!showOfferForm);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Admin Page</h1>
            <button
                className={`btn ${
                    showOfferForm ? "btn-secondary" : "btn-primary"
                }`}
                onClick={toggleOfferForm}
            >
                {showOfferForm ? "Back" : "Create Loyalty Offer"}
            </button>
            {showOfferForm && <OfferForm onClose={toggleOfferForm} />}{" "}
            {/* Pass toggleOfferForm as prop */}
            <h2 className="mt-4">Active Offers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Offer Name</th>
                        <th>Offer Type</th>
                        <th>Discount Amount</th>
                        <th>Note</th>
                        <th>Loyalty Point Price</th>
                        <th>Offer Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {activeOffers.map((offer) => (
                        <tr key={offer._id}>
                            <td>{offer.name}</td>
                            <td>{offer.type}</td>
                            <td>
                                {offer.type === "Discount"
                                    ? offer.discountAmount
                                    : "-"}
                            </td>
                            <td>
                                {offer.type === "Discount" ? "Discount" : ""}
                            </td>
                            <td>{offer.priceInPoints}</td>
                            <td>
                                {new Date(offer.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LP_admin;
