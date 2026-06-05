import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// 🔥 MONGODB CONNECTION
mongoose.connect("mongodb+srv://admin:ghing1998@cluster0.pnekrww.mongodb.net/inventory")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));


// 🔥 PRODUCT MODEL
const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  shop: String
});

const Product = mongoose.model("Product", productSchema);


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
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
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


// 🔥 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
});
