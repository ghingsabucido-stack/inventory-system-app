import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  shop: String,
  price: Number
});

const Product = mongoose.model("Product", productSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      stock: Number(req.body.stock),
      shop: req.body.shop || "",
      price: Number(req.body.price || 0)
    });

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.get("/api/products", async (req, res) => {
  res.json(await Product.find());
});

app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default app;
