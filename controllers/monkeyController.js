const Monkey = require("../models/monkey");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of monkeys and category counts (in parallel)
  const [
    numMonkeys,
    numCategories
  ] = await Promise.all([
    Monkey.countDocuments({}).exec(),
    Category.countDocuments({}).exec()
  ]);

  res.render("index", {
    title: "Local Library Home",
    monkey_count: numMonkeys,
    category_count: numCategories
  });
});

// Display list of all Monkeys.
exports.monkey_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey list");
  });
  
  // Display detail page for a specific Monkey.
  exports.monkey_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Monkey detail: ${req.params.id}`);
  });
  
  // Display Monkey create form on GET.
  exports.monkey_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey create GET");
  });
  
  // Handle Monkey create on POST.
  exports.monkey_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey create POST");
  });
  
  // Display Monkey delete form on GET.
  exports.monkey_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey delete GET");
  });
  
  // Handle Monkey delete on POST.
  exports.monkey_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey delete POST");
  });
  
  // Display Monkey update form on GET.
  exports.monkey_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey update GET");
  });
  
  // Handle Monkey update on POST.
  exports.monkey_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Monkey update POST");
  });