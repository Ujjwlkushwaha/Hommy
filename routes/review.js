const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrapper = require("../utils/asyncWrapper.js");
const CustomError = require("../utils/customError.js");
const {
  validateReview,
  isLoggedIn,
  saveRedirectUrl,
} = require("../utils/middleware.auth.js");
let Listing = require("../models/listing.js");
let Review = require("../models/reviews.js");
const {
  deleteReview,
  createReview,
} = require("../controllers/review.controller.js");

router.delete(
  "/:review_id",
  saveRedirectUrl,
  isLoggedIn,
  asyncWrapper(deleteReview)
);

router.post("/", isLoggedIn, validateReview, createReview);

module.exports = router;
