import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const overlay = {
    hide: {
        opacity: 0,
        backgroundColor: "unset",
    },
    visible: {
        opacity: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        transition: {
            delay: 0.5,
            duration: 1,
            when: "beforeChildren",
        },
    },
};

export default function Prize({ back, prize }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const customerId = "6603c22cbacfd0b8a0403a4e"; //temp
                const response = await axios.get(
                    `http://localhost:3001/prize/getBalance/${customerId}`
                );
                setBalance(
                    (prevBalance) => prevBalance + response.data.balance
                );
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        if (prize) {
            setShowPopup(true);
            const sendPrizeInfo = async () => {
                try {
                    const customerId = "6603c22cbacfd0b8a0403a4e"; //temp
                    await axios.post("http://localhost:3001/prize/add", {
                        customerId,
                        prizeWon: prize,
                    });

                    // Check if customer balance exists
                } catch (error) {
                    console.error("Error sending prize information:", error);
                }
            };
            sendPrizeInfo();

            if (prize === "No Reword") {
                setMessage("You have won no reward. Try again.");
            } else {
                setMessage(`You have won ${prize}`);
                // Send prize information to backend when prize is won

                const sendBalance = async () => {
                    try {
                        // Update balance with the prize amount
                        const customerId = "6603c22cbacfd0b8a0403a4e";
                        const balanceResponse = await axios.get(
                            `http://localhost:3001/prize/getBalance/${customerId}`
                        );
                        const currentBalance = balanceResponse.data.balance;

                        // Update balance with the prize amount
                        const updatedBalance =
                            currentBalance + parseFloat(prize);
                        await axios.put(
                            `http://localhost:3001/prize/updateLP/${customerId}`,
                            {
                                balance: updatedBalance,
                            }
                        );
                        console.log(updatedBalance);

                        // Fetch the updated balance
                        fetchBalance();
                    } catch (error) {
                        console.log(error);
                    }
                };
                sendBalance();
            }
        }
    }, [prize]); // Trigger when prize value changes

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="prize"
                variants={overlay}
                initial="hide"
                animate="visible"
                exit="hide"
            >
                <Modal show={showPopup} onHide={handleClosePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {prize === "No Reword"
                                ? "Oops!"
                                : "Congratulations!"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePopup}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </motion.div>
        </AnimatePresence>
    );
}
