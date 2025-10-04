import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connectDB .connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};
