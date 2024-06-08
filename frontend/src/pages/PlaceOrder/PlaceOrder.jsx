/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useStores } from "../../contexts/storeContext";
function PlaceOrder({ showLogin, setShowLogin }) {
  const frontend_url = "http://localhost:5173";
  const { getTotalCartAmount, cartItem, food_list, url, token } = useStores(); // Assuming useStores is a context hook you have
  const tx_ref = "tx-" + Math.random().toString(36).substr(2, 9); // unique reference
  const callback_url = frontend_url; // replace with your callback URL

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: getTotalCartAmount() + 2,
    currency: "ETB",
    tx_ref,
    callback_url,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrderHandler = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post(
        url + "/api/payment/create-payment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        window.location.href = response.data.data.checkout_url;
      } else {
        alert("Payment initialization failed");
      }
    } catch (error) {
      console.error(
        "Error during payment initialization:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
      alert("please login before proceeding to payment");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrderHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="first name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>{getTotalCartAmount()} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} ETB
              </p>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
