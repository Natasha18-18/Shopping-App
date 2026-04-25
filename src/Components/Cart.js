import {
  useContext
} from "react";

import {
  CartContext
} from "../context/CartContext";

import {
  useNavigate
} from "react-router-dom";

import "./Cart.css";

function Cart() {

  const {
    cart,
    dispatch
  } = useContext(CartContext);

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("auth") === "true";

  const total =
    cart.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    );

  return (

    <div className="cart-container">

      <h2 className="cart-title">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (

        <p className="empty">
          Your cart is empty
        </p>

      ) : (

        <>

          <div className="cart-list">

            {cart.map(item => (

              <div
                key={item.id}
                className="cart-card"
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    ₹ {item.price}
                  </p>

                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_QTY",
                        payload: {
                          id: item.id,
                          qty: Number(
                            e.target.value
                          )
                        }
                      })
                    }
                  />

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch({
                        type:
                          "REMOVE_FROM_CART",
                        payload: item.id
                      })
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-footer">

            <h3>
              Total:
              ₹ {total.toFixed(2)}
            </h3>

            <button
              className="order-btn"
              onClick={() =>
                navigate(
                  isLoggedIn
                    ? "/checkout"
                    : "/login"
                )
              }
            >
              Proceed To Checkout →
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;