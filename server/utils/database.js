import mongoose from 'mongoose';
import 'dotenv/config'; 

const uri = process.env.MONGO_URI;

export const connectToDb = async () => {
  try {
    // Mongoose needs its own connection
    await mongoose.connect(uri);
    console.log("✅ Mongoose successfully connected to MongoDB.");
  } catch (err) {
    console.error("❌ Mongoose failed to connect:", err);
    process.exit(1);
  }
};

// You don't need getDb() anymore with Mongoose 
// because Mongoose models handle the connection internally.