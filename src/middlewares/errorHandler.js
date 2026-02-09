const mongoose = require("mongoose");
const { ApiResponse } = require("../utils");

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  // Mongoose bad ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return ApiResponse.badRequest(res, "Invalid ID format");
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    return ApiResponse.badRequest(res, `Duplicate value for field: ${field}`);
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ApiResponse.badRequest(res, "Validation failed", errors);
  }

  // Default server error
  return ApiResponse.error(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    err.statusCode || 500
  );
};

module.exports = errorHandler;
