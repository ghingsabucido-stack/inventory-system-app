import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Inventory Dashboard</h1>

      {products.map(p => (
        <div key={p.id}>
          {p.name} - Stock: {p.stock} - Shop: {p.shop}
        </div>
      ))}
    </div>
  );
}
