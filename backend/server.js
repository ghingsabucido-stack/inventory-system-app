const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB
mongoose.connect("mongodb+srv://admin:ghing1998@cluster0.pnekrww.mongodb.net/inventory")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Model
const Product = mongoose.model("Product", {
  name: String,
  stock: Number,
  shop: String
});

// GET
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST
app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
