const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, description, price, category, inStock, tags } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            inStock,
            tags
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(", ") });
        }
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;