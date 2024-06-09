// import FAQ from '../models/faq.model.js';

// const createFAQ = async (req, res) => {
//     try {
//         const { question, answer } = req.body;
//         const newFAQ = await FAQ.create({ question, answer });
//         res.json({ success: true, faq: newFAQ });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error creating FAQ", error: error.message });
//     }
// }

// const getAllFAQs = async (req, res) => {
//     try {
//         const allFAQs = await FAQ.find();
//         res.json({ success: true, faqs: allFAQs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching FAQs", error: error.message });
//     }
// }

// const getFAQById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const faq = await FAQ.findById(id);
//         if (!faq) {
//             return res.status(404).json({ success: false, message: "FAQ not found" });
//         }
//         res.json({ success: true, faq });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching FAQ", error: error.message });
//     }
// }

// const updateFAQ = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { question, answer } = req.body;
//         const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
//         if (!updatedFAQ) {
//             return res.status(404).json({ success: false, message: "FAQ not found" });
//         }
//         res.json({ success: true, faq: updatedFAQ });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error updating FAQ", error: error.message });
//     }
// }

// const deleteFAQ = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedFAQ = await FAQ.findByIdAndDelete(id);
//         if (!deletedFAQ) {
//             return res.status(404).json({ success: false, message: "FAQ not found" });
//         }
//         res.json({ success: true, message: "FAQ deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error deleting FAQ", error: error.message });
//     }
// }

// export { createFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ };


import RVW from '../models/rvw.model.js'; // Importing the RVW model

// Controller for creating a new RVW
export const createRVW = async (req, res) => {
  try {
    const { code, rating, review } = req.body;
    const newRVW = new RVW({ code, rating, review });
    await newRVW.save();
    res.status(201).json(newRVW);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all RVWs
export const getAllRVWs = async (req, res) => {
  try {
    const rvws = await RVW.find();
    res.status(200).json(rvws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single RVW by ID
export const getRVWById = async (req, res) => {
  const { id } = req.params;
  try {
    const rvw = await RVW.findById(id);
    if (!rvw) return res.status(404).json({ message: 'RVW not found' });
    res.status(200).json(rvw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a RVW
export const updateRVW = async (req, res) => {
  const { id } = req.params;
  const { code, rating, review } = req.body;
  try {
    const updatedRVW = await RVW.findByIdAndUpdate(id, { code, rating, review }, { new: true });
    if (!updatedRVW) return res.status(404).json({ message: 'RVW not found' });
    res.status(200).json(updatedRVW);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a RVW
export const deleteRVW = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRVW = await RVW.findByIdAndDelete(id);
    if (!deletedRVW) return res.status(404).json({ message: 'RVW not found' });
    res.status(200).json({ message: 'RVW deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
