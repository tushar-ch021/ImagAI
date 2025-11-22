import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("✅ Database Connected Successfully"));
    mongoose.connection.on('error', (err) => console.log("❌ Database Connection Error:", err.message));
    mongoose.connection.on('disconnected', () => console.log("⚠️ Database Disconnected"));

    // Don't add /imagai here since we'll specify it in the connection string
    const mongoUrl = process.env.MONGODB_URL;

    const options = {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
        dbName: 'imagai', // Specify database name here
    };

    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(mongoUrl, options);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        console.error("\n📋 Troubleshooting steps:");
        console.error("1. Check if MongoDB Atlas IP whitelist includes your IP (or use 0.0.0.0/0 for testing)");
        console.error("2. Verify your MongoDB credentials in .env file");
        console.error("3. Ensure your MongoDB cluster is active");
        console.error("4. Check your internet connection\n");

        // Don't exit in development, allow retry
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

export default connectDB;
