const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Index and Create Routes
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.create)
  );

// New Route
router.get("/new", isLoggedIn, campgrounds.new);

// Show, Put and Delete Routes
router
  .route("/:id")
  .get(catchAsync(campgrounds.show))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.update)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

// Edit Route
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

module.exports = router;
