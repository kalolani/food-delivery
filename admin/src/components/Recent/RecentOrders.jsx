import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useStores } from "../../contexts/storeContext";
import Carousel from "../Carousel/Carousel";
import "./Recent.css";
function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useStores();

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/api/order/recent`);
      console.log(response.data);
      setOrders(response.data || []);
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
      <div>
        <Carousel orders={orders} handleUpdateStatus={handleUpdateStatus} />
      </div>
    </div>
  );
}

export default RecentOrders;
