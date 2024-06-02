import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function TotalOrder() {
  const [orderCount, setOrderCount] = useState(null);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/order/totalOrder`)
      .then((response) => {
        setOrderCount(response.data.orderCount);
      })
      .catch((error) => {
        console.error("Error fetching order count:", error);
      });
  }, []);

  return (
    <div>{orderCount !== null ? <p>{orderCount}</p> : <p>Loading...</p>}</div>
  );
}

export default TotalOrder;
