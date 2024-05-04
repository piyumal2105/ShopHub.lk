import Product from "../models/products.model.js";

const generateStokeId = async () => {
  // Get the last product, sorted by _id in descending order
  const lastStockDetails = await Product.find().sort({ _id: -1 }).limit(1);

  // Check if there are any products
  if (lastStockDetails.length === 0) {
    return "PRD-1"; // Return the first stock ID if no products are found
  }

  // Extract the numeric part of the last product's cusProductID and increment it
  const lastId = lastStockDetails[0].cusProductID; // Assuming 'cusProductID' is the field to increment
  const lastNumber = parseInt(lastId.split("-")[1]);
  const newIdNumber = lastNumber + 1;

  // Return the new product ID
  return `PRD-${newIdNumber}`;
};

// add product to the database
export const addProduct = async (req, res) => {
  try {
    // Generate product ID
    const proId = await generateStokeId();

    const newProduct = new Product({
      cusProductID: proId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      actualPrice: req.body.actualPrice,
      sellingPrice: req.body.sellingPrice,
      quantity: req.body.quantity,
      added_date: req.body.added_date,
      expire_date: req.body.expire_date,
    });

    const savedProduct = await newProduct.save();

    console.log(newProduct);

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err.message); // More specific logging for debugging
    res
      .status(500)
      .json({ error: "Failed to add product", details: err.message }); // Standardized error response
  }
};

//get all added data
export const getAllItems = async (req, res) => {
  try {
    const product = await Product.find(); // Retrieve all product (not deleted by worker or admin) documents from the database

    res.status(200).json(product); // Send the product as the response
    console.log(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

//get by id
export const getProductById = async (req, res) => {
  const productId = req.params.id; // Get the product ID from the request parameters

  try {
    const product = await Product.findById(productId); // Find the product by its ID

    if (!product) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product); // Send the product details as the response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

//Update products
export const updateProduct = async (req, res) => {
  const product_id = req.params.id;

  console.log(req.body);
  const updateFields = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    actualPrice: req.body.actualPrice,
    sellingPrice: req.body.sellingPrice,
    quantity: req.body.quantity,
    added_date: req.body.added_date,
    expire_date: req.body.expire_date,
  };

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      updateFields,
      { new: true }
    );

    if (!updateProduct) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct); // Send the updated Product as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product", error });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;

  try {
    const productDelete = await Product.findByIdAndDelete(_id);

    if (!productDelete) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Product", error });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { productId } = req.body;

    // For simplicity, assuming quantity is 1 when adding to cart

    // Create a new cart item
    const cartItem = new CartItem({
      productId,
      // Add any other relevant fields
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add item to cart", details: error.message });
  }
};