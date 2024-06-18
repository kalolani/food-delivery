/* eslint-disable react/prop-types */
import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
import { useStores } from "../../contexts/storeContext";
function Orders({ url }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useStores();

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (!token) return;

  if (isLoading)
    return (
      <div className="loadingComponent">
        <FadeLoader color="rgb(212 212 212)" loading={isLoading} size={50} />
      </div>
    );
  return (
    <div className="order-order add orders-order">
      <h3>order page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-order-item">
            <img src="mosob.png" alt="mosob" />

            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.kebele + ","}</p>
                <p>{order.address.building + "," + order.address.department}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items :{order.items.length}</p>
            <p>{order.amount} ETB</p>
            <select
              onChange={(event) => handleUpdateStatus(event, order._id)}
              value={order.status}
              className="order-items-select"
            >
              <option value="preparing">preparing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
