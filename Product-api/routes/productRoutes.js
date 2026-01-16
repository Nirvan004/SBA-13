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

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(", ") });
        }

        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

        let sort = {};
        if (sortBy) {
            const [field, order] = sortBy.split("_");
            sort[field] = order === "desc" ? -1 : 1;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;