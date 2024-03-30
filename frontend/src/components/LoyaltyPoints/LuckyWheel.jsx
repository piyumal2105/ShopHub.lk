import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wheel } from "react-custom-roulette";
import Prize from "./Prize";
import "./Wheel.css";
import LoyaltyPointPage from "./LoyaltyPointsPage";

const buttonMotion = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgba(255,255,255)",
        boxShadow: "0px 0px 8px rgba(255,0,255)",
        transition: {
            yoyo: Infinity,
            duration: 0.3,
        },
    },
};

const containerMotion = {
    hide: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            when: "beforeChildren",
        },
    },
};

const LuckyWheel = () => {
    const ref = useRef();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showPrize, setShowPrize] = useState("");
    const [modalPrize, setModalPrize] = useState(false);

    const data = [
        {
            option: "100",
            style: { backgroundColor: "#62c050", textColor: "white" },
        },
        {
            option: "No Reword",
            style: { backgroundColor: "#e83d45", textColor: "white" },
        },
        {
            option: "75",
            style: { backgroundColor: "#fb8e42", textColor: "white" },
        },
        {
            option: "No Reword",
            style: { backgroundColor: "#e83d45", textColor: "white" },
        },
        {
            option: "25",
            style: { backgroundColor: "#62c050", textColor: "white" },
        },
        {
            option: "No Reword",
            style: { backgroundColor: "#e83d45", textColor: "white" },
        },
        {
            option: "50",
            style: { backgroundColor: "#fb8e42", textColor: "white" },
        },
        {
            option: "No Reword",
            style: { backgroundColor: "#e83d45", textColor: "white" },
        },
    ];

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleSpinStop = () => {
        setMustSpin(false);
        setModalPrize(true);
        setShowPrize(data[prizeNumber].option);
    };

    const back = (value) => {
        setModalPrize(value);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <motion.div
            className="game"
            variants={containerMotion}
            initial="hide"
            animate="visible"
        >
            <div className="game_content">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={handleSpinStop}
                    outerBorderColor="#4E5452"
                    outerBorderWidth={3}
                    innerBorderColor="#fff"
                    innerBorderWidth={3}
                    radiusLineColor="black"
                />
                <motion.button
                    variants={buttonMotion}
                    whileHover="hover"
                    className="game_content_spin"
                    onClick={handleSpinClick}
                >
                    Spin
                </motion.button>
            </div>
            {modalPrize && <Prize back={back} prize={showPrize} />}
        </motion.div>
    );
};

export default LuckyWheel;
