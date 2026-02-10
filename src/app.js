const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const connectDB = require("./config/db");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middlewares");

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Allowed origins
const allowedOrigins = [
  "https://aura-bitz-website-m2nf1zw58-aura-bitzs-projects.vercel.app",
  "https://backend-aura-bitz.onrender.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

// =====================
// CORS CONFIG (FIXED)
// =====================
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, curl, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging in development
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// =====================
// Health check route
// =====================
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: config.nodeEnv,
    database: dbStatus[dbState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

// =====================
// API Routes
// =====================
app.use("/api/v1", routes);

// =====================
// Error handling
// =====================
app.use(notFound);
app.use(errorHandler);

module.exports = app;
