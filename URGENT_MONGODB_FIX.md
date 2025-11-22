# URGENT: MongoDB Atlas IP Whitelist Fix

## Step-by-Step Instructions (Takes 2 minutes)

### 1. Open MongoDB Atlas
- Go to: https://cloud.mongodb.com/
- Log in with your credentials

### 2. Navigate to Network Access
- In the left sidebar, click "Network Access"
- You'll see a list of whitelisted IP addresses

### 3. Add Your IP Address
- Click the green "ADD IP ADDRESS" button
- You'll see two options:

   **Option A - Quick Test (Recommended for now):**
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - This will add 0.0.0.0/0 to the whitelist
   - Click "Confirm"

   **Option B - Secure (For production):**
   - Click "ADD CURRENT IP ADDRESS"
   - It will auto-detect your IP
   - Click "Confirm"

### 4. Wait for Changes to Apply
- Wait 1-2 minutes for the changes to propagate
- You'll see a green "Active" status next to your IP entry

### 5. Verify Connection
- Your server should automatically reconnect
- Look for: "✅ Database Connected Successfully" in the terminal

## If This Doesn't Work

Try these alternative connection strings in your `.env` file:

### Option 1: Add SSL parameter
```
MONGODB_URL=mongodb+srv://tusharchaudhary02100_db_user:IgcVwp4jogpqRJ7J@cluster0.xyvpza2.mongodb.net/imagai?retryWrites=true&w=majority&ssl=true
```

### Option 2: Use standard connection (not SRV)
Go to MongoDB Atlas → Connect → Drivers → Get your standard connection string

## Still Having Issues?

Check if your cluster is paused:
1. Go to "Database" in MongoDB Atlas
2. Look at your cluster status
3. If it says "Paused", click "Resume"

---

**After completing these steps, restart your server and try logging in again.**
