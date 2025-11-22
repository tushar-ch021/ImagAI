import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Google Imagen!' });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const apiKey = process.env.GOOGLE_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;

        const response = await axios.post(
            url,
            {
                instances: [{ prompt }],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: '1:1',
                    outputOptions: { mimeType: 'image/jpeg' }
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const image = response.data.predictions[0].bytesBase64Encoded;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error?.response?.data || error.message);
        res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
});

export default router;
