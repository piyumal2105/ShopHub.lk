import Promotions from "../models/promotions.model.js";


//generate promotion Id
const generatePromotionId = async () => {
  // Get the last product, sorted by _id in descending order
  const lastPromotionDetails = await Promotions.find().sort({ _id: -1 }).limit(1);

  // Check if there are any products
  if (lastPromotionDetails.length === 0) {
    return "PROMOTION-1"; // Return the first stock ID if no products are found
  }

  // Extract the numeric part of the last product's cusProductID and increment it
  const lastId = lastPromotionDetails[0].promotionId; // Assuming 'cusProductID' is the field to increment
  const lastNumber = parseInt(lastId.split("-")[1]);
  const newIdNumber = lastNumber + 1;

  // Return the new product ID
  return `PROMOTION-${newIdNumber}`;
};
export const addPromotion = async (req, res) => {
  try {
    const promoID = await generatePromotionId();
    const newPromotion = new Promotions({
      promotionId: promoID,
      promotionTitle: req.body.promotionTitle,
      promotionType: req.body.promotionType,
      image: req.body.image,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      termsNconditions: req.body.termsNconditions,
    });
    const savedPromotion = await newPromotion.save();
    console.log(newPromotion);
    res.status(201).json(savedPromotion);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "failed to add promotion" });
  }
};
// Get all promotions
export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotions.find();
    res.status(200).json(promotions);
    console.log(promotions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to View promotions" });
  }
};
// Get a single promotion by ID
export const getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotions.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json(promotion);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to retrieve promotion" });
  }
};

// Update a promotion by ID
export const updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotions.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json(updatedPromotion);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to update promotion" });
  }
};

// Delete a promotion by ID
export const deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotions.findByIdAndDelete(req.params.id);
    if (!deletedPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to delete promotion" });
  }
};
