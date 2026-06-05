const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB
mongoose.connect("mongodb+srv://admin:ghing1998@cluster0.pnekrww.mongodb.net/inventory")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Model
const Product = mongoose.model("Product", {
  name: String,
  stock: Number,
  shop: String
});

// GET
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ALL (optional)
app.delete("/api/products", async (req, res) => {
  await Product.deleteMany({});
  res.json({ message: "Deleted all products" });
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
