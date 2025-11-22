import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
// Import transaction model if it exists; otherwise comment out related code
// import transactionModel from "../models/transactionModel.js";

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------- Register ----------
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ---------- Login ----------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({ success: true, token, user: { name: user.name } });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ---------- Credits ----------
// Middleware now attaches userId to req.userId
const userCredits = async (req, res) => {
    try {
        console.log('userCredits - req.userId:', req.userId);
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User ID not found. Please login again.' });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Daily Limit Logic (Reset at 12 PM) - Sync with imageController logic
        const now = new Date();
        const resetTime = new Date();
        resetTime.setHours(12, 0, 0, 0); // Today 12:00 PM

        if (now < resetTime) {
            resetTime.setDate(resetTime.getDate() - 1);
        }

        const userLastGen = user.lastGenerationDate ? new Date(user.lastGenerationDate) : new Date(0);

        if (userLastGen < resetTime) {
            // It's a new "day", reset dailyGenerations for display
            user.dailyGenerations = 0;
            // We don't necessarily need to save this to DB here, but it helps consistency
            // await user.save(); // Optional: save if you want persistent reset on view
        }

        console.log('userCredits - user found:', user.name);
        res.json({
            success: true,
            credits: user.creditBalance,
            user: {
                name: user.name,
                dailyGenerations: user.dailyGenerations || 0,
            },
        });
    } catch (error) {
        console.log('userCredits - error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ---------- Razorpay Payment ----------
const paymentRazorpay = async (req, res) => {
    try {
        const { planId, userId } = req.body;
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }
        let amount, credits;
        switch (planId) {
            case "Basic":
                amount = 10;
                credits = 100;
                break;
            case "Advanced":
                amount = 50;
                credits = 500;
                break;
            case "Business":
                amount = 250;
                credits = 5000;
                break;
            default:
                return res.json({ success: false, message: "Plan not found" });
        }
        const date = Date.now();
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: `${userId}_${date}`,
        };
        const newOrder = await razorpayInstance.orders.create(options);
        // You may want to store the order info in a transaction collection here
        res.json({ success: true, order: newOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ---------- Verify Razorpay ----------
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === "paid") {
            // Assuming you have a transaction model to look up the receipt
            // const transactionData = await transactionModel.findById(orderInfo.receipt);
            // if (transactionData.payment) {
            //     return res.json({ success: false, message: "Payment Failed" });
            // }
            // const userData = await userModel.findById(transactionData.userId);
            // const creditBalance = userData.creditBalance + transactionData.credits;
            // await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            // await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
            // res.json({ success: true, message: "Credits Added" });
            // For now just acknowledge success
            res.json({ success: true, message: "Payment verified (implementation placeholder)" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
