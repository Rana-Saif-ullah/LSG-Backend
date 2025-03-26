require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoute = require("./routes/contact.route.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" })); // Limit request body size

// Handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ status: 400, message: "Invalid JSON format" });
    }
    next();
});

// Routes
app.use("/api/contacts", contactRoute);

app.get("/", (req, res) => {
    res.send("Hello Saifullah! It's from Node API Server");
});

// MongoDB Connection with Retry Logic
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        setTimeout(connectDB, 5000); // Retry connection after 5s
    }
};
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
