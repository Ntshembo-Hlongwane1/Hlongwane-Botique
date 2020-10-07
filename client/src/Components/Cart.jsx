import React, { useState, useEffect } from "react";
import axios from "axios";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import "../StyleSheet/Cart.css";
const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  let totalPrice = 0;
  const token = localStorage.getItem("usid");
  const url = "http://127.0.0.1:5000/api/user-cart";
  const production_url_fetch_user_cart = "/api/user-cart";
  const user = localStorage.getItem("usid");

  const removeFromCart = (productID) => {
    console.log("ID: ", productID);
    const url = "http://127.0.0.1:5000/api/remove-from-cart";
    const production_url_remove_cart = "/api/remove-from-cart";
    const data = new FormData();
    data.append("productID", productID);
    axios
      .post(production_url_remove_cart, data, {
        headers: {
          "x-auth-token": user,
        },
      })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("fail");
      });
  };
  useEffect(() => {
    axios
      .get(production_url_fetch_user_cart, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setUserCart(response.data.cart);
        console.log("Cart:", userCart);
      })
      .catch((error) => {
        console.log(":( No cart");
      });
  }, []);
  return (
    <div className="CartItems__container">
      {user ? (
        user && userCart.length > 0 ? (
          <div className="Cart">
            <div className="Cart__items">
              <h1>YOUR CART ITEMS</h1>
              {userCart.map((item) => {
                return (
                  <div className="Cart_productImage" key={item.productID}>
                    <img src={item.productImage} alt="Product In cart" />
                    <div className="Cart_productSummary">
                      <h3>{item.productName}</h3>
                      <h3 className="cartProduct__price">{`R${item.productPrice}`}</h3>
                    </div>
                    <button onClick={() => removeFromCart(item.productID)}>
                      remove product
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="Cart__summary">
              <h1>CART SUMMARY</h1>
              <div className="Shipping__details">
                <LocalShippingIcon />
                <div className="fee">
                  <h4>Shipping Fee:</h4>
                  <select>
                    <option value={100}>Gauteng: R100</option>
                    <option value={150}>Cape Town: R150</option>
                    <option value={200}>Limpopo: R200</option>
                    <option value={100}>Mpumalanga: R100</option>
                    <option value={450}>Internation: R400</option>
                  </select>
                </div>
              </div>
              {userCart.map((item) => {
                totalPrice += item.productPrice * item.Qty;
              })}
              <h3 className="Cart__totalPrice">{`Total Price: R${totalPrice}`}</h3>
              <div className="CheckOutForm">
                <form action="https://sandbox.payfast.co.za​/eng/process">
                  <input
                    type="hidden"
                    name="merchant_id"
                    value={process.env.REACT_APP_MERCHANT_ID}
                  />
                  <input
                    type="hidden"
                    name="merchant_key"
                    value={process.env.REACT_APP_MERCHANT_KEY}
                  />
                  <input
                    type="hidden"
                    name="return_url"
                    value="http://127.0.0.1:3000/success"
                  />
                  <input
                    type="hidden"
                    name="cancel_url"
                    value="http://127.0.0.1:3000/cart/cancel"
                  />
                  <input type="hidden" name="name_first" value="Junior" />
                  <input type="hidden" name="name_last" value="Hlongwane" />
                  <input
                    type="hidden"
                    name="email_address"
                    value="jh0417783@gmail.com"
                  />
                  <input type="hidden" name="cell_number" value="0648735776" />
                  <input type="hidden" name="amount" value="800.00" />
                  <input type="hidden" name="item_name" value="Test Item" />
                  <input type="hidden" name="email_confirmation" value="1" />
                  <input
                    type="hidden"
                    name="signature"
                    value="160e7e4485562234ff34e6dc4ac3e8bb"
                  />
                  <button className="Cart__checkOutButton">
                    PROCEED TO CHECKOUT
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="CartEmpty__text">Shopping Cart is Empty</h1>
        )
      ) : (
        <h1>Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default Cart;
