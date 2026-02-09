const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const connectDB = require("./config/db");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middlewares");

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging in development
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
});

module.exports = app;
