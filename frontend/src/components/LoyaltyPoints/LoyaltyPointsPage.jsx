import React, { useState, useEffect } from "react";
import axios from "axios";
import LuckyWheel from "./LuckyWheel";

const LoyaltyPointPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [wheelActive, setWheelActive] = useState(false); // State to track wheel activation
    const [activeOffers, setActiveOffers] = useState([]);

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

    const handleShowPopup = () => {
        setShowPopup(true);
        setWheelActive(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setWheelActive(false);
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleWheelActivation = () => {
        setWheelActive(true);
    };

    const handleOfferClick = (offerId) => {
        // Handle clicking on active offer buttons
        console.log("Clicked on offer with ID:", offerId);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Loyalty Point Page</h1>
            {!wheelActive && (
                <div>
                    <h2>Active Offers</h2>
                    <div className="row">
                        {activeOffers.map((offer, index) => (
                            <div className="col-md-4 mb-3" key={index}>
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    onClick={() => handleOfferClick(offer._id)}
                                >
                                    {offer.name} - {offer.priceInPoints}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!showPopup && !wheelActive && (
                <button className="btn btn-primary" onClick={handleShowPopup}>
                    Open Lucky Wheel
                </button>
            )}

            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup" onClick={handlePopupClick}>
                        <button
                            onClick={handleClosePopup}
                            className="btn-close btn btn-danger"
                        ></button>
                        <LuckyWheel onWheelActivation={handleWheelActivation} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoyaltyPointPage;
