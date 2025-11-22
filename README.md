# ImagAI - AI Image Generator

A MERN stack AI SaaS application that generates images from text prompts.

## Features
- Generate images using AI (Pollination.AI / Google Gemini)
- Share images with the community
- Download generated images
- Dark mode UI with Tailwind CSS

## Setup

### Server
1. Navigate to `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in `server` with the following credentials:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### Client
1. Navigate to `client` directory:
   ```bash
   cd client
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```


