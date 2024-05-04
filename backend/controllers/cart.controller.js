import Product from "../models/products.model.js"; // Import the Product model
import CartItem from "../models/cartItem.model.js"; // Import the CartItem model



// Controller function to add an item to the cart
export const addToCart = async (req, res) => {
  try {
    // Extract the custom product ID from the request body
    const { productId } = req.body;

    // Query the database for the product with the custom product ID
    // Here, you would replace 'cusProductID' with the field name in your database schema
    const product = await Product.findOne({ cusProductID: productId });

    if (!product) {
      // If the product with the given custom ID is not found, return an error
      return res.status(404).json({ error: "Product not found" });
    }

    // Create a new cart item using the MongoDB ObjectID of the product
    const cartItem = new CartItem({
      productId: product._id, // Use the MongoDB ObjectID of the product
      // You can add other fields here as needed
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add item to cart", details: error.message });
  }
};

// Controller function to update quantity of an item in the cart
// export const updateCartItemQuantity = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;
//
//     // Find the cart item by ID and update its quantity
//     const updatedCartItem = await CartItem.findByIdAndUpdate(id, { quantity }, { new: true });
//     console.log('Quantity updated successfully:', updatedCartItem);
//
//     if (!updatedCartItem) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }
//
//     res.status(200).json(updatedCartItem);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Failed to update cart item quantity", details: error.message });
//   }
// };

export const updateProduct = async (req, res) => {
  const product_id = req.params.id;

  console.log(req.body);
  const updateFields = {


    quantity: req.body.quantity,

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


export const getProductListFromCart = async (req, res) => {
  try {
    // Query the cart table to get all cart items
    const cartItems = await CartItem.find();

    // Extract product IDs from cart items
    const productIds = cartItems.map(item => item.productId);

    // Query the product table to get the details of products with the extracted IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Send the list of products with full details as the response
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch product list from cart", error: error.message });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    // Extract the MongoDB ID of the product from the request parameters
    const { id } = req.params;

    // Find and delete the cart item with the given MongoDB ID
    const deletedProduct = await CartItem.findByIdAndDelete(id);

    if (!deletedProduct) {
      // If the product with the given ID is not found in the cart, return an error
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Product deleted from cart successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to delete product from cart", error: error.message });
  }
};