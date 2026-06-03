import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// TEMP INVENTORY DATA
let products = [
  { id: 1, name: "Sample Product", stock: 10, shop: "Purple Heart" }
];

// GET PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ADD PRODUCT
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    stock: req.body.stock,
    shop: req.body.shop
  };
  products.push(newProduct);
  res.json(newProduct);
});

// DASHBOARD DATA
app.get("/api/dashboard", (req, res) => {
  res.json({
    totalProducts: products.length,
    totalStock: products.reduce((a, b) => a + b.stock, 0)
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

