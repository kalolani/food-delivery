/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useStores } from "../../contexts/storeContext";
function PlaceOrder({ showLogin, setShowLogin }) {
  const frontend_url = "https://food-delivery-frontend-u8jx.onrender.com";
  const { getTotalCartAmount, cartItem, food_list, url, token } = useStores(); // Assuming useStores is a context hook you have
  const { tx_ref } = useStores();

  const callback_url = frontend_url; // replace with your callback URL

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    building: "",
    kebele: "",
    department: "",
    campus: "",
    id: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrderHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      currency: "ETB",
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phone,
      tx_ref: tx_ref,
      callback_url: callback_url,
    };

    try {
      let response = await axios.post(
        url + "/api/payment/create-payment",
        orderData,
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
          name="building"
          onChange={onChangeHandler}
          value={data.building}
          type="text"
          placeholder="Building"
        />
        <div className="multi-fields">
          <input
            name="kebele"
            onChange={onChangeHandler}
            value={data.kebele}
            type="text"
            placeholder="Kebele (optional)"
          />
          <input
            required
            name="department"
            onChange={onChangeHandler}
            value={data.department}
            type="text"
            placeholder="Department"
          />
        </div>
        <div className="multi-fields">
          <input
            name="id"
            onChange={onChangeHandler}
            value={data.id}
            type="text"
            placeholder="ID (optional)"
          />
          <input
            required
            name="campus"
            onChange={onChangeHandler}
            value={data.campus}
            type="text"
            placeholder="Campus"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
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
