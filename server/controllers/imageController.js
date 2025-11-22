import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Daily Limit Logic (Reset at 12 PM)
        const now = new Date();
        const resetTime = new Date();
        resetTime.setHours(12, 0, 0, 0); // Today 12:00 PM

        // If now is before 12 PM, the relevant reset time was Yesterday 12 PM
        if (now < resetTime) {
            resetTime.setDate(resetTime.getDate() - 1);
        }

        const userLastGen = user.lastGenerationDate ? new Date(user.lastGenerationDate) : new Date(0);

        if (userLastGen < resetTime) {
            // It's a new "day" (after 12 PM reset)
            user.dailyGenerations = 0;
            // We don't update lastGenerationDate here yet, it updates on successful generation
        }

        // Determine if this generation is free or paid
        let isFreeGeneration = false;
        if (user.dailyGenerations < 5) {
            isFreeGeneration = true;
        } else {
            // Daily limit exceeded, check credits
            if (user.creditBalance <= 0) {
                return res.json({ success: false, message: "Daily limit reached & No Credits. Please upgrade.", limitReached: true, creditBalance: user.creditBalance });
            }
            // User has credits, proceed as paid generation
        }

        // Try Google Imagen via REST API
        try {
            const apiKey = process.env.GOOGLE_API_KEY;
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
                {
                    instances: [{ prompt }],
                    parameters: {
                        sampleCount: 1,
                        aspectRatio: '1:1',
                        outputOptions: { mimeType: 'image/jpeg' }
                    },
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const base64Image = response.data.predictions[0].bytesBase64Encoded;
            const resultImage = `data:image/jpeg;base64,${base64Image}`;

            // Update User
            const updateData = {
                dailyGenerations: user.dailyGenerations + 1,
                lastGenerationDate: now
            };
            // Only deduct credit if NOT free generation
            if (!isFreeGeneration) {
                updateData.creditBalance = user.creditBalance - 1;
            }

            await userModel.findByIdAndUpdate(user._id, updateData);

            // Return updated credit balance (use current if free, else decremented)
            const newCreditBalance = isFreeGeneration ? user.creditBalance : user.creditBalance - 1;

            return res.json({ success: true, message: "Image Generated", creditBalance: newCreditBalance, resultImage });

        } catch (googleError) {
            console.log("Google API Error:", googleError.response?.data || googleError.message);

            // Fallback to Pollinations.ai
            console.log("Falling back to Pollinations.ai");
            const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
            const imageResponse = await axios.get(pollinationsUrl, { responseType: 'arraybuffer' });
            const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
            const resultImage = `data:image/jpeg;base64,${base64Image}`;

            // Update User (Same logic)
            const updateData = {
                dailyGenerations: user.dailyGenerations + 1,
                lastGenerationDate: now
            };
            if (!isFreeGeneration) {
                updateData.creditBalance = user.creditBalance - 1;
            }

            await userModel.findByIdAndUpdate(user._id, updateData);

            const newCreditBalance = isFreeGeneration ? user.creditBalance : user.creditBalance - 1;

            return res.json({ success: true, message: "Image Generated (Fallback)", creditBalance: newCreditBalance, resultImage });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { generateImage };
