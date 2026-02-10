const { onRequest } = require("firebase-functions/v2/https");
const app = require("./src/app");

// Export the Express app as a Firebase Cloud Function
exports.api = onRequest({ cors: true }, app);
