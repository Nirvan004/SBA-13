const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});