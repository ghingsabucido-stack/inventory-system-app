import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// =======================
// 🔥 MONGODB CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// =======================
// 🔥 PRODUCT MODEL (FIXED)
// =======================
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  shop: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

// =======================
// 🔥 ROOT ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Inventory API is running");
});

// =======================
// 🔥 GET ALL PRODUCTS
// =======================
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 GET SINGLE PRODUCT
// =======================
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 GET BY SHOP
// =======================
app.get("/api/products/shop/:shopName", async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.shopName });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 ADD PRODUCT
// =======================
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 UPDATE STOCK ONLY
// =======================
app.patch("/api/products/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 DELETE ALL PRODUCTS
// =======================
app.delete("/api/products", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// 🔥 START SERVER
// =======================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
