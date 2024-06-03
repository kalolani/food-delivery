/* eslint-disable react/prop-types */
import "./Recent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useStores } from "../../contexts/storeContext";
function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useStores();
  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/api/order/recent`);

      setOrders(response.data);
      console.log(response.data.data);
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

  if (isLoading)
    return (
      <div className="loadingComponent">
        <HashLoader color="#FF6347" loading={isLoading} size={50} />
      </div>
    );
  return (
    <div className="order add">
      <h3>Recent orders</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
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
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
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

export default RecentOrders;