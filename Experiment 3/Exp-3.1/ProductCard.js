import "./ProductCard.css";

function ProductCard({ name, price, inStock }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="price">₹{price}</p>

      {inStock ? (
        <p className="stock in">In Stock</p>
      ) : (
        <p className="stock out">Out of Stock</p>
      )}
    </div>
  );
}

export default ProductCard;
