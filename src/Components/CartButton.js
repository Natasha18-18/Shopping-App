import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartButton({ onClick }) {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <button className="cart-btn" onClick={() => navigate("/login")}>
      🛒 Cart ({totalItems})
    </button>
  );
}

export default CartButton;