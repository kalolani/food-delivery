import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function TotalCategory() {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/order/totalCategory`)
      .then((response) => {
        setCategoryTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category types:", error);
      });
  }, []);

  return (
    <div>
      <p>{categoryTypes}</p>
    </div>
  );
}

export default TotalCategory;
