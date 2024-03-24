const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MonkeySchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 40 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String, required: true, minLength: 3, maxLength: 300 },
  price: { type: Number, required: true },
  numInStock: { type: Number, required: true },
});

// Virtual for monkey's URL
MonkeySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/monkey/${this._id}`;
});

// Export model
module.exports = mongoose.model("Monkey", MonkeySchema);
