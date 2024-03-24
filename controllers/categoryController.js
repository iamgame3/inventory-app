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
      title: category.name,
      category: category,
      category_monkeys: monkeysInCategory,
    });
  });
  
  // Display Category create form on GET.
  exports.category_create_get = (req, res, next) => {
    res.render("category_form", { title: "Create Category" });
  };
  
  // Handle Category create on POST.
  exports.category_create_post = [
    // Validate and sanitize fields
    body("name", "Category name must contain at least 2 characters and at most 30 characters.")
      .trim()
      .isLength({ min: 2 })
      .isLength({ max: 30 })
      .escape(),
    body("description", "Description name must contain at least 3 characters and at most 200 characters.")
      .trim()
      .isLength({ min: 3 })
      .isLength({ max: 200 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a category object with escaped and trimmed data.
      const category = new Category({
        name: req.body.name,
        description: req.body.description
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("category_form", {
          title: "Create Category",
          category: category,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Category with same name already exists.
        const categoryExists = await Category.findOne({ name: req.body.name }).exec();
        if (categoryExists) {
          // Category exists, redirect to its detail page.
          res.redirect(categoryExists.url);
        } else {
          await category.save();
          // New category saved. Redirect to category detail page.
          res.redirect(category.url);
        }
      }
    }),
  ];
  
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