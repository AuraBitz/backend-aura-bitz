const app = require("./app");
const config = require("./config");

// Start server (only for local development, not used in Firebase)
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
});
