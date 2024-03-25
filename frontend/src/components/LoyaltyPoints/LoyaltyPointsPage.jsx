import React, { useState } from "react";
import LuckyWheel from "./LuckyWheel";

const LoyaltyPointPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div>
            <h1>Loyalty Point Page</h1>
            {!showPopup && (
                <button onClick={handleShowPopup}>Open Lucky Wheel</button>
            )}

            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup" onClick={handlePopupClick}>
                        <button
                            onClick={handleClosePopup}
                            className="close-button"
                        >
                            Close
                        </button>
                        <LuckyWheel />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoyaltyPointPage;
