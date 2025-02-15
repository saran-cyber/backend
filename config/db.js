// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
