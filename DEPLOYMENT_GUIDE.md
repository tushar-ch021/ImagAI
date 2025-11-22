# Deployment Guide for ImagAI on Render

This guide will walk you through deploying your MERN stack application to Render. You will deploy the backend as a **Web Service** and the frontend as a **Static Site**.

## Prerequisites

1.  **GitHub Repository**: Ensure your latest code is pushed to GitHub (we just did this!).
2.  **Environment Variables**: Have your local `.env` file content ready. You will need to copy these values to Render.

---

## Part 1: Deploying the Backend (Server)

1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub account and select the **ImagAI** repository.
4.  Configure the service with the following settings:
    *   **Name**: `imagai-server` (or any unique name)
    *   **Region**: Choose the one closest to you (e.g., Singapore or Frankfurt).
    *   **Root Directory**: `server`  <-- **IMPORTANT**
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Instance Type**: Free (for hobby projects)

5.  **Environment Variables**:
    Scroll down to the "Environment Variables" section and click **Add Environment Variable**. Add the following keys and values from your local `.server/env` file:

    | Key | Value Description |
    | :--- | :--- |
    | `MONGODB_URL` | Your MongoDB Connection String |
    | `JWT_SECRET` | Your secret key for JWT |
    | `GOOGLE_API_KEY` | Your Gemini/Imagen API Key |
    | `RAZORPAY_KEY_ID` | Your Razorpay Key ID |
    | `RAZORPAY_KEY_SECRET` | Your Razorpay Key Secret |
    | `CURRENCY` | e.g., `INR` or `USD` |
    | `PORT` | `4000` (Optional, Render sets this automatically, but good to have) |

    *Note: For MongoDB Atlas, ensure your Network Access is set to allow access from anywhere (`0.0.0.0/0`) because Render IPs change.*

6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. You should see "API Working" if you visit the URL provided by Render (e.g., `https://imagai-server.onrender.com`).
8.  **Copy this Backend URL**, you will need it for the frontend.

---

## Part 2: Deploying the Frontend (Client)

1.  Go back to the [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Static Site**.
3.  Select the same **ImagAI** repository.
4.  Configure the site with the following settings:
    *   **Name**: `imagai-client` (or any unique name)
    *   **Root Directory**: `client` <-- **IMPORTANT**
    *   **Build Command**: `npm install; npm run build`
    *   **Publish Directory**: `dist`

5.  **Environment Variables**:
    Add the following variables:

    | Key | Value |
    | :--- | :--- |
    | `VITE_BACKEND_URL` | The URL you copied from Part 1 (e.g., `https://imagai-server.onrender.com`) **WITHOUT** the trailing slash `/` |
    | `VITE_RAZORPAY_KEY_ID` | Your Razorpay Key ID (same as backend) |

6.  Click **Create Static Site**.
7.  Wait for the build to complete. Once finished, Render will provide you with a live URL for your website.

---

## Troubleshooting

*   **White Screen on Frontend**: Check the browser console (F12). If you see 404 errors for assets, ensure the "Publish Directory" is set to `dist`.
*   **API Errors**: If requests fail, check the Network tab. Ensure `VITE_BACKEND_URL` is correct and does not have a trailing slash (e.g., it should be `...onrender.com`, not `...onrender.com/`).
*   **MongoDB Connection Error**: Check your MongoDB Atlas Network Access whitelist.
