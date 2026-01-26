import mongoose from "mongoose";
import { env } from "./env";

const MONGO_URL = env.MONGO_URL;

if(!MONGO_URL) {
  throw new Error('MONGO_URL is not defined in .env');
}

export const connectDB = async(): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection error;', error);
    process.exit(1);
  }
}