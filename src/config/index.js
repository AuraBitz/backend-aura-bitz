const path = require("path");

// Load .env file only if it exists (local development)
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "production",
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

// Validate required environment variables
const requiredEnvVars = ["MONGODB_URI"];
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar] || process.env[envVar].trim() === ""
);

if (missingEnvVars.length > 0) {
  console.error("========================================");
  console.error("MISSING ENVIRONMENT VARIABLES:");
  missingEnvVars.forEach((envVar) => {
    console.error(`  - ${envVar}`);
  });
  console.error("");
  console.error(
    "If deploying on Render, set these in Dashboard > Environment."
  );
  console.error("If running locally, create a .env file in backend root.");
  console.error("========================================");
}

module.exports = config;
