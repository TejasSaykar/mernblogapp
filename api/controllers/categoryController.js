const postModel = require("../models/postModel");
const categoryModel = require("../models/categoryModel")

exports.categoryController = async (req, res) => {
    try {
        const { name } = req.body
        const saveCat = await new categoryModel({ name }).save();
        res.status(201).json({
            success: true,
            message: "Category created",
            saveCat
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating the category",
            error
        })
    }
}


// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const allCats = await categoryModel.find({});
        res.status(201).json({
            catCount: allCats.length,
            success: true,
            message: "Getting all categories",
            allCats
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
}