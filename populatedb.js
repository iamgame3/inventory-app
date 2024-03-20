#! /usr/bin/env node

console.log(
    'This script populates some test monkeys and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Monkey = require("./models/monkey");
  const Category = require("./models/category");
  
  const monkeys = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createMonkeys();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // category[0] will always be the Primary category, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function CategoryCreate(index, name, description) {
    const category = new Category({
        name: name,
        description: description
    });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function MonkeyCreate(index, name, category, description, price, numInStock) {
    const monkeydetail = {
      name: name,
      description: description,
      price: price,
      numInStock: numInStock,
    };
    if (category != false) monkeydetail.category = category;
  
    const monkey = new Monkey(monkeydetail);
    await monkey.save();
    monkeys[index] = monkey;
    console.log(`Added monkey: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      CategoryCreate(0, "Primary", "Good old fashioned Bloon poppin'."),
      CategoryCreate(1, "Military", "When the Bloons cross the line, bring in the big guns."),
      CategoryCreate(2, "Magic", "The mysterious power of the Bloons must be fought with mysterious power of monkeys."),
      CategoryCreate(3, "Support", "Monkeys are strong. Support makes them stronger."),
    ]);
  }
  
  async function createMonkeys() {
    console.log("Adding Monkeys");
    await Promise.all([
      MonkeyCreate(0,
        "Dart Monkey",
        categories[0],
        "Simple, yet effective.",
        200,
        10
      ),
      MonkeyCreate(1,
        "Heli Pilot",
        categories[1],
        "All map range, and only weak to DDTs. A well rounded monkey.",
        1600,
        3
      ),
      MonkeyCreate(2,
        "Wizard Monkey",
        categories[2],
        "A true master of monkey wizardry.",
        375,
        5
      ),
      MonkeyCreate(3,
        "Monkey Village",
        categories[3],
        "Want more money? Want to dominate all Bloon types? Want an OP dart monkey? We've got you covered.",
        1200,
        2
      ),
    ]);
  }
