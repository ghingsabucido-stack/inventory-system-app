import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb+srv://admin:GHING1998@cluster0.pnekrww.mongodb.net/inventory?appName=Cluster0");

// MODEL
const Product = mongoose.model("Product", {
  name: String,
  stock: Number,
  shop: String
});

// GET PRODUCTS
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running"));
