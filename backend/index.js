import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/dbConfig.js";
import AdminAuthRoutes from "./routes/admin.auth.routes.js";
import PromotionRoutes from "./routes/promotions.routes.js";
import EventRoutes from "./routes/event.routes.js";
import customerRoute from "./routes/customerRoute.js";


//initialized express
const app = express();

const URL = process.env.ORIGIN_URL;

// SERVER PORT
const PORT = process.env.PORT || 6001;

// root end point
app.get("/", (req, res) => {
  res.send("Welcome to ShopHub.lk");
});

// CORS [allow the pass the cookies to orin localhost]
app.use(cors({ credentials: true, origin: URL }));

// accept JSONS
app.use(express.json({ limit: "100mb" }));

// config the urlEncoded middleware
app.use(express.urlencoded({ extended: false }));

// register cookie parser middleware
app.use(cookieParser());

app.use("/admin", AdminAuthRoutes);
app.use("/promotion", PromotionRoutes);
app.use("/event",EventRoutes);
app.use("/customer", customerRoute);


app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});
