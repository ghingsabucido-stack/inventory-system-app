import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// HOME TEST
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// GET products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// UPDATE product
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default app;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
