const { ApiResponse } = require("../utils");

const notFound = (req, res, next) => {
  return ApiResponse.notFound(res, `Route not found: ${req.method} ${req.originalUrl}`);
};

module.exports = notFound;
