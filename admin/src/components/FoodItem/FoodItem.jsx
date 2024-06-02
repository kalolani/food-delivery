import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function FoodItem() {
  const [foodItemCount, setFoodItemCount] = useState(null);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/food/countFood`)
      .then((response) => {
        setFoodItemCount(response.data.foodItemCount);
      })
      .catch((error) => {
        console.error("Error fetching food item count:", error);
      });
  }, []);

  return (
    <div>
      {foodItemCount !== null ? <p>{foodItemCount}</p> : <p>Loading...</p>}
    </div>
  );
}

export default FoodItem;
