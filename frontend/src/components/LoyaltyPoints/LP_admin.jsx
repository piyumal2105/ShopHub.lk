import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OfferForm from "./OfferForm";
import Sidenavbar from "../AdminDashboard/SideNavbar";

const LP_admin = () => {
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [activeOffers, setActiveOffers] = useState([]);
  const [inactiveOffers, setInactiveOffers] = useState([]);
  const [showOfferHistory, setShowOfferHistory] = useState(false); // State to control visibility of offer history
  const { offerID } = useParams();

  useEffect(() => {
    fetchActiveOffers();
  }, []);

  const fetchActiveOffers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/offers/getoffer`);
      // Filter active offers before setting state
      const filteredActiveOffers = response.data.filter(
        (offer) => offer.status === "Active"
      );
      setActiveOffers(filteredActiveOffers);

      // Filter inactive offers
      const filteredInactiveOffers = response.data.filter(
        (offer) => offer.status !== "Active"
      );
      setInactiveOffers(filteredInactiveOffers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const toggleOfferForm = () => {
    setShowOfferForm(!showOfferForm);
  };
  const toggleOfferHistory = () => {
    setShowOfferHistory(!showOfferHistory);
  };

  const handleDeactivateOffer = async (offerId) => {
    try {
      await axios.put(`http://localhost:3001/offers/updateoffer/${offerId}`, {
        status: "Inactive",
      });
      // Refetch offers after deactivation
      fetchActiveOffers();
    } catch (error) {
      console.error("Error deactivating offer:", error);
    }
  };

  return (
    <>
      <Sidenavbar />
      <div className="container mt-4" style={{ width: "800px" }}>
        <center>
          <button
            className={`btn ${showOfferForm ? "btn-secondary" : "btn-primary"}`}
            onClick={toggleOfferForm}
          >
            {showOfferForm ? "Back" : "Create Loyalty Offer"}
          </button>
        </center>

        {showOfferForm && <OfferForm onClose={toggleOfferForm} />}
        <h2 className="mt-4">Active Offers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Offer Name</th>
              <th>Offer Type</th>
              <th>Discount Amount</th>

              <th>Loyalty Point Price</th>
              <th>Offer Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeOffers.map((offer) => (
              <tr key={offer._id}>
                <td>{offer.name}</td>
                <td>{offer.type}</td>
                <td>
                  {offer.type === "Discount" ? offer.discountAmount : "-"}
                </td>

                <td>{offer.priceInPoints}</td>
                <td>{new Date(offer.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeactivateOffer(offer._id)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Button for Offer History */}
        <button className="btn btn-secondary" onClick={toggleOfferHistory}>
          {showOfferHistory ? "Close Offer History" : "Offer History"}
        </button>
        {/* Offer History Table */}
        {showOfferHistory && (
          <>
            <h2 className="mt-4">Offer History</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Offer Name</th>
                  <th>Offer Type</th>
                  <th>Discount Amount</th>

                  <th>Loyalty Point Price</th>
                  <th>Offer Created Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inactiveOffers.map((offer) => (
                  <tr key={offer._id}>
                    <td>{offer.name}</td>
                    <td>{offer.type}</td>
                    <td>
                      {offer.type === "Discount" ? offer.discountAmount : "-"}
                    </td>

                    <td>{offer.priceInPoints}</td>
                    <td>{new Date(offer.createdAt).toLocaleDateString()}</td>
                    <td>{offer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default LP_admin;
