import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME as string;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(uri!, { dbName });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error while connecting DB", error);
        process.exit(1);
    }
}

export default connectDB;



