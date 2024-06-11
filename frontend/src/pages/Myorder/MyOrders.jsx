import { useEffect, useState } from "react";
import { useStores } from "../../contexts/storeContext";

import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";
import { NavLink } from "react-router-dom";
import "./MyOrders.css";
function MyOrders() {
  const { url, token } = useStores();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        url + "/api/order/userorder",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {isLoading && (
        <div className="loadingComponent">
          <ClipLoader color="#FF6347" loading={isLoading} size={50} />
        </div>
      )}
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src="mosob.png" alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "(" + item.quantity + ")";
                  } else {
                    return item.name + "(" + item.quantity + ")" + ",";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span
                  className={
                    order.status === "Delivered" ? "complete" : "progress"
                  }
                >
                  &#x25cf;
                </span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
      <NavLink to="/rating">
        <p>Rate your order</p>
      </NavLink>
    </div>
  );
}

export default MyOrders;
