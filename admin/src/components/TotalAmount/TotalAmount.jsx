import { useEffect } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function TotalAmount() {
  const { url, totalAmountSold, setTotalAmountSold } = useStores();
  console.log(totalAmountSold);
  console.log(url);

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios
      .get(`${url}/api/order/totalAmount`)
      .then((response) => {
        setTotalAmountSold(response.data.totalAmountSold);
      })
      .catch((error) => {
        console.error("Error fetching total amount sold:", error);
      });
  }, []);

  return (
    <div>
      {totalAmountSold !== null ? (
        <p>{totalAmountSold} ETB</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TotalAmount;
