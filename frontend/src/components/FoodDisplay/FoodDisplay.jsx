import { useStores } from "../../contexts/storeContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

function FoodDisplay({ catagory }) {
  const { food_list } = useStores();
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          {
            console.log(catagory, item);
          }
          if (catagory === "All" || catagory === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
