import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function Delivered() {
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(null);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/order/delivered`)
      .then((response) => {
        setDeliveredOrderCount(response.data.deliveredOrderCount);
      })
      .catch((error) => {
        console.error("Error fetching delivered order count:", error);
      });
  }, []);

  return (
    <div>
      {deliveredOrderCount !== null ? (
        <p>{deliveredOrderCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Delivered;
