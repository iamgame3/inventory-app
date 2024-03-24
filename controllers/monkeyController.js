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
    title: "Monkey Inventory",
    monkey_count: numMonkeys,
    category_count: numCategories
  });
});

// Display list of all Monkeys.
exports.monkey_list = asyncHandler(async (req, res) => {
    const allMonkeys = await Monkey.find().sort({ title: 1 }).exec();
    res.render("monkey_list", { title: "All Monkeys", monkey_list: allMonkeys });
  });
  
  // Display detail page for a specific Monkey.
  exports.monkey_detail = asyncHandler(async (req, res, next) => {
    // Get details of monkeys
    const monkey = await Monkey.findById(req.params.id).populate("category").exec();
  
    if (monkey === null) {
      // No results.
      const err = new Error("Monkey not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("monkey_detail", {
      title: monkey.name,
      monkey: monkey,
    });
  });
  
  // Display Monkey create form on GET.
  exports.monkey_create_get = asyncHandler(async (req, res) => {
    // Get all categories, which we can use for adding to our monkey.
    const allCategories = await Category.find().sort({ name: 1 }).exec();
  
    res.render("monkey_form", {
      title: "Create Monkey",
      categories: allCategories,
    });
  });
  
  // Handle Monkey create on POST.
  exports.monkey_create_post = [
  // Validate and sanitize fields.
    body("name", "Name must contain at least 2 characters and at most 40 characters.")
      .trim()
      .isLength({ min: 2 })
      .isLength({ max: 40 })
      .escape(),
    body("price").escape(),
    body("description", "Description must contain at least 3 characters and at most 300 characters.")
      .trim()
      .isLength({ min: 3 })
      .isLength({ max: 300 })
      .escape(),
    body("numInStock").escape(),
    body("category").escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Monkey object with escaped and trimmed data.
      const monkey = new Monkey({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        numInStock: req.body.numInStock,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        // Get all categories for form.
        const allCategories = await Category.find().sort({ name: 1 }).exec();
  
        // Mark our selected category as selected.
        for (const category of allCategories) {
          if (monkey.category === (category._id)) {
            category.selected = "true";
          }
        }
        res.render("monkey_form", {
          title: "Create Monkey",
          categories: allCategories,
          monkey: monkey,
          errors: errors.array(),
        });
      } else {
        // Data from form is valid. Save monkey.
        await monkey.save();
        res.redirect(monkey.url);
      }
    }),
  ];
  
  // Display Monkey delete form on GET.
  exports.monkey_delete_get = asyncHandler(async (req, res) => {
    // Get details of monkey
    const monkey = await Monkey.findById(req.params.id).exec();
  
    if (monkey === null) {
      // No results.
      res.redirect("/monkeys");
    }
  
    res.render("monkey_delete", {
      title: "Delete Monkey",
      monkey: monkey,
    });
  });
  
  // Handle Monkey delete on POST.
  exports.monkey_delete_post = asyncHandler(async (req, res) => {
    // Get details of monkey
    const monkey = await Monkey.findById(req.params.id).exec();
  
    // Delete object and redirect to the list of monkeys.
      await Monkey.findByIdAndDelete(req.body.monkeyid);
      res.redirect("/monkeys");
  });
  
  // Display Monkey update form on GET.
  exports.monkey_update_get = asyncHandler(async (req, res, next) => {
    // Get monkey and categories for form.
    const [monkey, allCategories] = await Promise.all([
      Monkey.findById(req.params.id).exec(),
      Category.find({}).sort({ title: 1 }).exec(),
    ]);
  
    if (monkey === null) {
      // No results.
      const err = new Error("Monkey not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("monkey_form", {
      title: "Update Monkey",
      monkey: monkey,
      categories: allCategories,
    });
  });
  
  // Handle Monkey update on POST.
  exports.monkey_update_post = [
    // Validate and sanitize fields.
      body("name", "Name must contain at least 2 characters and at most 40 characters.")
        .trim()
        .isLength({ min: 2 })
        .isLength({ max: 40 })
        .escape(),
      body("price").escape(),
      body("description", "Description must contain at least 3 characters and at most 300 characters.")
        .trim()
        .isLength({ min: 3 })
        .isLength({ max: 300 })
        .escape(),
      body("numInStock").escape(),
      body("category").escape(),
  
      // Process request after validation and sanitization.
      asyncHandler(async (req, res) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        // Create a Monkey object with escaped and trimmed data.
        const monkey = new Monkey({
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          numInStock: req.body.numInStock,
          _id: req.params.id, // This is required, or a new ID will be assigned!
        });
    
        if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.
    
          // Get all categories for form.
          const allCategories = await Category.find().sort({ name: 1 }).exec();
    
          // Mark our selected category as selected.
          for (const category of allCategories) {
            if (monkey.category === (category._id)) {
              category.selected = "true";
            }
          }
          res.render("monkey_form", {
            title: "Create Monkey",
            categories: allCategories,
            monkey: monkey,
            errors: errors.array(),
          });
        } else {
          // Data from form is valid. Update the record.
          const updatedMonkey = await Monkey.findByIdAndUpdate(req.params.id, monkey, {});
          // Redirect to monkey detail page.
          res.redirect(updatedMonkey.url);
        }
      }),
    ];