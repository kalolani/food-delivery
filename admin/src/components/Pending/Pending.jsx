import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function Pending() {
  const [pendingOrderCount, setPendingOrderCount] = useState(null);
  const { url } = useStores();
  console.log(pendingOrderCount);
  console.log(url);

  useEffect(() => {
    axios
      .get(`${url}/api/order/pending`)
      .then((response) => {
        setPendingOrderCount(response.data.deliveredOrderCount);
      })
      .catch((error) => {
        console.error("Error fetching delivered order count:", error);
      });
  }, []);

  return (
    <div>
      {pendingOrderCount !== null ? (
        <p>{pendingOrderCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Pending;
