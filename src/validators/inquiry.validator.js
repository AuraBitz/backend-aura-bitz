const validateCreateInquiry = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!data.phoneNumber || typeof data.phoneNumber !== "string" || !data.phoneNumber.trim()) {
    errors.push({ field: "phoneNumber", message: "Phone number is required" });
  }

  if (data.companyName !== undefined && data.companyName !== null && typeof data.companyName !== "string") {
    errors.push({ field: "companyName", message: "Company name must be a string" });
  }

  if (!data.service || typeof data.service !== "string" || !data.service.trim()) {
    errors.push({ field: "service", message: "Service is required" });
  }

  if (!data.message || typeof data.message !== "string" || !data.message.trim()) {
    errors.push({ field: "message", message: "Message is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateUpdateInquiry = (data) => {
  const errors = [];
  const allowedFields = ["name", "phoneNumber", "companyName", "service", "message"];
  const updateKeys = Object.keys(data);

  // Check if at least one valid field is provided
  const hasValidField = updateKeys.some((key) => allowedFields.includes(key));
  if (!hasValidField) {
    errors.push({ field: "body", message: "At least one valid field is required for update" });
  }

  // Validate individual fields if provided
  if (data.name !== undefined && (typeof data.name !== "string" || !data.name.trim())) {
    errors.push({ field: "name", message: "Name must be a non-empty string" });
  }

  if (data.phoneNumber !== undefined && (typeof data.phoneNumber !== "string" || !data.phoneNumber.trim())) {
    errors.push({ field: "phoneNumber", message: "Phone number must be a non-empty string" });
  }

  if (data.companyName !== undefined && data.companyName !== null && typeof data.companyName !== "string") {
    errors.push({ field: "companyName", message: "Company name must be a string or null" });
  }

  if (data.service !== undefined && (typeof data.service !== "string" || !data.service.trim())) {
    errors.push({ field: "service", message: "Service must be a non-empty string" });
  }

  if (data.message !== undefined && (typeof data.message !== "string" || !data.message.trim())) {
    errors.push({ field: "message", message: "Message must be a non-empty string" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateCreateInquiry, validateUpdateInquiry };
