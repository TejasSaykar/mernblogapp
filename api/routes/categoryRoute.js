const express = require("express");
const { categoryController, getAllCategories } = require("../controllers/categoryController");
const router = express.Router();

// Create category
router.post("/create-category", categoryController);

// Get all categories
router.get("/all-category", getAllCategories)

module.exports = router;