const express = require('express');
const router = express.Router();
const monkey_controller = require("../controllers/monkeyController");
const category_controller = require("../controllers/categoryController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/// MONKEY ROUTES ///

// This must come before routes that display Monkey (uses id).
router.get("/monkey/create", monkey_controller.monkey_create_get);

router.post("/monkey/create", monkey_controller.monkey_create_post);

router.get("/monkey/:id/delete", monkey_controller.monkey_delete_get);

router.post("/monkey/:id/delete", monkey_controller.monkey_delete_post);

router.get("/monkey/:id/update", monkey_controller.monkey_update_get);

router.post("/monkey/:id/update", monkey_controller.monkey_update_post);

router.get("/monkey/:id", monkey_controller.monkey_detail);

router.get("/monkeys", monkey_controller.monkey_list);

/// CATEGORY ROUTES ///

// This must come before routes that display Category (uses id).
router.get("/category/create", category_controller.category_create_get);

router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);

router.post("/category/:id/update", category_controller.category_update_post);

router.get("/category/:id", category_controller.category_detail);

router.get("/categories", category_controller.category_list);

module.exports = router;
