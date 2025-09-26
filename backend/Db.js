const mongoose = require("mongoose");
require("dotenv").config(); // .env file read karne ke liye

const mongoURI = process.env.MONGO_URI; // Atlas se URI lega

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Agar error aaye to server band ho jaye
  }
};

module.exports = connectToMongo;
