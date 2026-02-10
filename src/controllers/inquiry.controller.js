const { Inquiry } = require("../models");
const { ApiResponse, asyncHandler } = require("../utils");
const { validateCreateInquiry, validateUpdateInquiry } = require("../validators/inquiry.validator");
const { sendInquiryEmails } = require("../services/email.service");

/**
 * @desc    Create a new inquiry
 * @route   POST /api/v1/inquiries
 */
const createInquiry = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateCreateInquiry(req.body);
  if (!isValid) {
    return ApiResponse.badRequest(res, "Validation failed", errors);
  }

  const { name, email, phoneNumber, companyName, service, message } = req.body;

  const inquiry = await Inquiry.create({
    name,
    email,
    phoneNumber,
    companyName: companyName || null,
    service,
    message,
  });

  // Send emails (non-blocking - don't fail the request if email fails)
  sendInquiryEmails(inquiry).then((result) => {
    console.log("Email results:", result);
  }).catch((err) => {
    console.error("Email sending error:", err.message);
  });

  return ApiResponse.created(res, inquiry, "Inquiry created successfully");
});

/**
 * @desc    Get all inquiries with pagination
 * @route   GET /api/v1/inquiries
 */
const getInquiries = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  // Optional search
  const search = req.query.search || "";
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { service: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
    ];
  }

  // Sort
  const sortField = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

  const [inquiries, total] = await Promise.all([
    Inquiry.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
    Inquiry.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return ApiResponse.paginated(res, inquiries, {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  });
});

/**
 * @desc    Get single inquiry by ID
 * @route   GET /api/v1/inquiries/:id
 */
const getInquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    return ApiResponse.notFound(res, "Inquiry not found");
  }

  return ApiResponse.success(res, inquiry, "Inquiry fetched successfully");
});

/**
 * @desc    Update inquiry by ID
 * @route   PATCH /api/v1/inquiries/:id
 */
const updateInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validateUpdateInquiry(req.body);
  if (!isValid) {
    return ApiResponse.badRequest(res, "Validation failed", errors);
  }

  const allowedFields = ["name", "email", "phoneNumber", "companyName", "service", "message"];
  const updateData = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!inquiry) {
    return ApiResponse.notFound(res, "Inquiry not found");
  }

  return ApiResponse.success(res, inquiry, "Inquiry updated successfully");
});

/**
 * @desc    Delete inquiry by ID
 * @route   DELETE /api/v1/inquiries/:id
 */
const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findByIdAndDelete(id);
  if (!inquiry) {
    return ApiResponse.notFound(res, "Inquiry not found");
  }

  return ApiResponse.success(res, null, "Inquiry deleted successfully");
});

module.exports = {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
};
