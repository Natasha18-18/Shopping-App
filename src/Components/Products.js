import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Products({ products }) {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <img src={p.image} alt={p.title} />

          <h4>{p.title}</h4>
          <p>₹ {p.price}</p>
          <p>{p.category}</p>

          {/* 🔥 ADD TO CART BUTTON */}
          <button
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", payload: p })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;