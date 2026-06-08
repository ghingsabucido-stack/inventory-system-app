import express from "express";
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
