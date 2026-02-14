import ProductCard from "./components/ProductCard/ProductCard";
import Background from "./components/Background/Background";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Background />

      <h1 className="title">Our Products</h1>

      <div className="card-container">
        <ProductCard name="Laptop" price="55000" inStock={true} />
        <ProductCard name="Headphones" price="2999" inStock={false} />
        <ProductCard name="Smart Watch" price="4999" inStock={true} />
      </div>
    </div>
  );
}

export default App;
