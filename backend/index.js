import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/dbConfig.js";
import AdminAuthRoutes from "./routes/admin.auth.routes.js";

import MemberRoutes from "./routes/member.routes.js";
import ProductRoutes from "./routes/product.routes.js";

import CartRoutes from "./routes/cart.routes.js";

import OnPickupRoutes from "./routes/onp.routes.js"; // Import the OnPickup routes
// import paymentRoutes from "./routes/paymentRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";


// Initialize express
const app = express();

const URL = process.env.ORIGIN_URL;

// SERVER PORT
const PORT = process.env.PORT || 6001;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to ShopHub.lk");
});

// CORS [allow the pass the cookies to origin localhost]
app.use(cors({ credentials: true, origin: URL }));

// Accept JSONs
app.use(express.json({ limit: "100mb" }));

// Config the urlEncoded middleware
app.use(express.urlencoded({ extended: false }));

// Register cookie parser middleware
app.use(cookieParser());

// Use admin routes
app.use("/admin", AdminAuthRoutes);
app.use("/member", MemberRoutes);
app.use("/product", ProductRoutes);

app.use("/cart", CartRoutes);

// // Use on-pickup routes
// app.use("/onpickup", OnPickupRoutes); // Assuming you prefix on-pickup routes with /api/onpickup

// Use admin routes
app.use("/pick",OnPickupRoutes);

// Use payment routes
// app.use("/api/payment", paymentRoutes);


// Other middleware and configurations...

// app.use("/api/orders", orderRoutes);


app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});
