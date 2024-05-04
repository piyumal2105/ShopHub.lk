import React, { useState, useEffect } from "react";
import axios from "axios";
import LuckyWheel from "./LuckyWheel";
import "./LuckyPointsStyles.css"; // Import your CSS file for styling
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LoyaltyPointPage = () => {
    const [showMainPopup, setShowMainPopup] = useState(false); // For the main popup
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // For the confirmation popup
    const [wheelActive, setWheelActive] = useState(false); // State to track wheel activation
    const [activeOffers, setActiveOffers] = useState([]);
    const [balance, setBalance] = useState(0); // State to hold balance
    const [loyaltyPointHistory, setLoyaltyPointHistory] = useState([]);
    const [selectOffer, setselectOffer] = useState([]);
    const [selectprize, setselectPrize] = useState(0);

    useEffect(() => {
        fetchActiveOffers();
        fetchBalance(); // Fetch balance when component mounts
        fetchLoyaltyPointHistory();
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

    const fetchBalance = async () => {
        try {
            const customerId = "6603c22cbacfd0b8a0403a4e";
            const response = await axios.get(
                `http://localhost:3001/prize/getBalance/${customerId}`
            );
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };
    const fetchLoyaltyPointHistory = async () => {
        try {
            const customerId = "6603c22cbacfd0b8a0403a4e";
            const response = await axios.get(
                `http://localhost:3001/prize/getLpHistory/${customerId}`
            );
            setLoyaltyPointHistory(response.data);
        } catch (error) {
            console.error("Error fetching loyalty point history:", error);
        }
    };

    const handleShowMainPopup = () => {
        setShowMainPopup(true);
        setWheelActive(true);
    };

    const handleCloseMainPopup = () => {
        setShowMainPopup(false);
        setWheelActive(false);
        fetchBalance();
    };

    const handleShowConfirmationPopup = () => {
        setShowConfirmationPopup(true);
    };

    const handleCloseConfirmationPopup = () => {
        setShowConfirmationPopup(false);
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleWheelActivation = () => {
        setWheelActive(true);
    };

    const handleOfferClick = (offerId, priceInPoints) => {
        // Handle clicking on active offer buttons
        console.log("Clicked on offer with ID:", offerId);
        setselectOffer(offerId);
        setselectPrize(priceInPoints);
        // Show confirmation popup
        handleShowConfirmationPopup();
    };

    const handleConfirmPurchase = async () => {
        try {
            const customerId = "6603c22cbacfd0b8a0403a4e";

            // Ensure selectprize is converted to a number
            const prizeAmount = parseFloat(selectprize);

            // Send request to backend to update balance and record offer purchase
            const response = await axios.post(
                `http://localhost:3001/prize/offerpurchase`,
                {
                    customerId,
                    offerId: selectOffer,
                }
            );

            // Fetch updated balance
            const balanceResponse = await axios.get(
                `http://localhost:3001/prize/getBalance/${customerId}`
            );
            const currentBalance = balanceResponse.data.balance;

            // Ensure currentBalance and prizeAmount are valid numbers
            if (!isNaN(currentBalance) && !isNaN(prizeAmount)) {
                // Update balance with the prize amount
                const updatedBalance = currentBalance - prizeAmount;

                // Send request to update balance
                await axios.put(
                    `http://localhost:3001/prize/updateLP/${customerId}`,
                    {
                        balance: updatedBalance,
                    }
                );
            } else {
                console.error("Invalid balance or prize amount");
                // Handle error
            }

            handleCloseConfirmationPopup();
        } catch (error) {
            console.error("Error confirming purchase:", error);
            // Handle error
        }
    };

    const handleCancelPurchase = () => {
        // Handle cancellation of offer purchase
        console.log("Offer purchase canceled");
        // Hide confirmation popup
        handleCloseConfirmationPopup();
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="mb-4">Loyalty Point Page</h1>
                <div className="balance-container">
                    {" "}
                    <div className="balance-box">
                        <h2 className="balance-heading">Balance</h2>
                        {balance} points
                    </div>{" "}
                </div>
                <div className="button-container">
                    {!showMainPopup && !wheelActive && (
                        <button
                            className="btn-primary"
                            onClick={handleShowMainPopup}
                        >
                            Open Lucky Wheel
                        </button>
                    )}
                </div>
                {!wheelActive && (
                    <div>
                        <h2>Active Offers</h2>
                        <div className="row">
                            {activeOffers.map((offer, index) => (
                                <div className="col-md-4 mb-3" key={index}>
                                    <button
                                        className="offer-btn"
                                        onClick={() =>
                                            handleOfferClick(offer._id)
                                        }
                                    >
                                        {offer.type === "Discount" && (
                                            <div>
                                                Rs. {offer.discountAmount}
                                            </div>
                                        )}
                                        <div>{offer.type}</div>{" "}
                                        {/* Display offer type */}
                                        <div>{offer.priceInPoints} points</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!wheelActive && (
                    <div>
                        <h2>Loyalty Point History</h2>
                        <table className="loyalty-point-history-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Points</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loyaltyPointHistory.map(
                                    (historyItem, index) => (
                                        <tr key={index}>
                                            <td>{historyItem.description}</td>
                                            <td>{historyItem.points}</td>
                                            <td>{historyItem.type}</td>
                                            <td>
                                                {new Date(
                                                    historyItem.date
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {showConfirmationPopup && (
                    <div
                        className="popup-overlay"
                        onClick={handleCloseConfirmationPopup}
                    >
                        <div className="popup" onClick={handlePopupClick}>
                            <h2>Confirm Purchase</h2>
                            <p>Would you like to purchase this offer ?</p>
                            <button
                                onClick={handleConfirmPurchase}
                                className="btn-confirm"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancelPurchase}
                                className="btn-cancel"
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}
                {showMainPopup && (
                    <div
                        className="popup-overlay"
                        onClick={handleCloseMainPopup}
                    >
                        <div className="popup" onClick={handlePopupClick}>
                            <LuckyWheel
                                onWheelActivation={handleWheelActivation}
                            />
                        </div>
                        <button
                            onClick={handleCloseMainPopup}
                            className="btn-close btn-danger"
                        >
                            close
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
export default LoyaltyPointPage;
