const express = require("express");
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} = require("../controllers/inquiry.controller");

router.route("/").post(createInquiry).get(getInquiries);

router.route("/:id").get(getInquiryById).patch(updateInquiry).delete(deleteInquiry);

module.exports = router;
