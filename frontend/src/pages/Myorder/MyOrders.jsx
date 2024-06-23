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
       // Sort the data in descending order based on a relevant property
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
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
    <div className="my-order">
      <h2>My Orders</h2>

      {isLoading && (
        <div className="loadingComponent">
          <ClipLoader color="#FF6347" loading={isLoading} size={50} />
        </div>
      )}
      <div className="container">
        {data.map((order, index) => {
          return (
            <>
              <div key={index} className="my-orders-orders">
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
              <NavLink to={`/rating?id=${order._id}`}>
                <p className="order-link">Rate your order</p>
              </NavLink>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
