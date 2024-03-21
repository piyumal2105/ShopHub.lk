import mongoose from "mongoose";
import "dotenv/config";

const databaseConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("💻 Database is synced!");
  } catch (error) {
    console.log("DB CONNECT ERROR: ", error.message);
    process.exit(1);
  }
};

export default databaseConnect;
