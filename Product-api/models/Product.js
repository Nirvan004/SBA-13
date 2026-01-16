const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0.01, "Price must be greater than 0"] },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    tags : [String],
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;