import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const overlay = {
    hide: {
        opacity: 0,
        backgroundColor: "unset",
    },
    visible: {
        opacity: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        transtion: {
            delay: 0.5,
            duration: 1,
            when: "beforeChildren",
        },
    },
};

const box = {
    hide: {
        y: "-100vh",
    },

    visible: {
        y: 0,
        transtion: {
            delay: 1,
        },
    },
};

export default function Prize({ back, prize }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (prize) {
            setShowPopup(true);
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
                        <Modal.Title>Congratulations!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You have won {prize}</p>
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
