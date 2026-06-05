import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 🔥 MONGODB CONNECTION (SAFE FOR RAILWAY)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// 🔥 PRODUCT MODEL
const Product = mongoose.model("Product", {
  name: String,
  stock: Number,
  shop: String
});

// 🔥 GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 ADD PRODUCT
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 DELETE ALL PRODUCTS (OPTIONAL RESET)
app.delete("/api/products", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 START SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
