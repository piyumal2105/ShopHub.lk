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


import FAQ from '../models/faq.model.js'; // Importing the FAQ model

// Controller for creating a new FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single FAQ by ID
export const getFAQById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a FAQ
export const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a FAQ
export const deleteFAQ = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) return res.status(404).json({ message: 'FAQ not found' });
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
