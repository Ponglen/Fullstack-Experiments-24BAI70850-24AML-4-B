import { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Headphones", price: 2000, category: "Electronics" },
  { id: 3, name: "Shoes", price: 3000, category: "Fashion" },
  { id: 4, name: "T-Shirt", price: 1000, category: "Fashion" },
  { id: 5, name: "Book", price: 500, category: "Education" }
];

export default function App() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let products =
    category === "All"
      ? [...productsData]
      : productsData.filter(p => p.category === category);

  if (sort === "low") products.sort((a, b) => a.price - b.price);
  if (sort === "high") products.sort((a, b) => b.price - a.price);

  return (
    <div className="container">
      <header>
        <h1>🛒 Product Filter</h1>
        <p>Browse products by category and price</p>
      </header>

      <div className="controls">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Education">Education</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <h2>₹ {p.price}</h2>
            <span className="badge">{p.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
