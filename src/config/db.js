const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {

  let MONGODB_URI="mongodb+srv://aurabitzz_db_user:aurabitz%40555@aura-biz.cl1uazb.mongodb.net/aurabitz?retryWrites=true&w=majority&appName=Aura-biz"
  
  const uri = MONGODB_URI;

  if (!uri || uri.trim() === "") {
    console.error("MongoDB URI is not set. Skipping database connection.");
    console.error(
      "Set MONGODB_URI in environment variables (Render Dashboard or .env file)."
    );
    return; // Don't crash the server - let health check & other routes work
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error("Server will continue running without database connection.");
    // Don't exit - let the server run so other routes (health check) still work
  }
};

module.exports = connectDB;
