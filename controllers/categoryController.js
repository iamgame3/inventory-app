const Category = require("../models/category");
const Monkey = require("../models/monkey");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec();
    res.render("category_list", {
      title: "All Categories",
      category_list: allCategories,
    });
  });
  
  // Display detail page for a specific Category.
  exports.category_detail = asyncHandler(async (req, res) => {
    const allMonkeys = await Monkey.find().sort({ title: 1 }).exec();
    res.render("monkey_list", { title: "All Monkeys", monkey_list: allMonkeys });
  });
  
  // Display detail page for a specific Category.
  exports.category_detail = asyncHandler(async (req, res, next) => {
    // Get details of category and all associated monkeys (in parallel)
    const [category, monkeysInCategory] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Monkey.find({ category: req.params.id }).exec(),
    ]);
    if (category === null) {
      // No results.
      const err = new Error("Category not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("category_detail", {
      title: "Category Detail",
      category: category,
      category_monkeys: monkeysInCategory,
    });
  });
  
  // Display Category create form on GET.
  exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
  });
  
  // Handle Category create on POST.
  exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
  });
  
  // Display Category delete form on GET.
  exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
  });
  
  // Handle Category delete on POST.
  exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
  });
  
  // Display Category update form on GET.
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
  });
  
  // Handle Category update on POST.
  exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
  });