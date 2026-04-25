import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

import {
  CartContext
} from "../context/CartContext";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const {
    isLoggedIn,
    logout
  } = useContext(AuthContext);

  const { cart } =
    useContext(CartContext);

  const totalItems =
    cart.reduce(
      (acc, item) => acc + item.qty,
      0
    );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <nav className="navbar">

      <h2 className="logo">
        ShopEasy
      </h2>

      <div className="nav-links">

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart ({totalItems})
        </Link>

        {!isLoggedIn ? (

          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>
          </>

        ) : (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
}

export default Navbar;