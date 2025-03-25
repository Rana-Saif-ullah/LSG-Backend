const express = require('express');
const mongoose = require('mongoose');
const contactRoute = require('./routes/contact.route.js');
const app = express();

// middleware
app.use(express.json());

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid JSON format'
    });
  }
  next();
});

// routes
app.use("/api/contacts", contactRoute);

app.get('/', (req, res) => {
    res.send("Hello Saifullah! Its from node API Server");
});

// Database Connection - **Important for Vercel**
// Move database connection outside the listening block
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://rsaifullah991:hMSEM5LXhIGqCQXl@lsg-db.f2faw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=LSG-DB");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit process on connection failure
    }
};

connectDB(); // Call the connection function

// **Remove the app.listen() block entirely for Vercel**
// Vercel will handle starting the serverless function

// Export the app for Vercel
module.exports = app;