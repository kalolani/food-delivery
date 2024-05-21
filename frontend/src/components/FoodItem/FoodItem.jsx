import "./FoodItem.css";
import { assets } from "../../assets/assets";

import { useStores } from "../../contexts/storeContext";
import ClipLoader from "react-spinners/ClipLoader";

function FoodItem({ id, name, price, description, image }) {
  const { cartItem, addItem, removeItem, url, cartAddLoading, cartRemLoading } =
    useStores();
  const combinedLoading = cartAddLoading || cartRemLoading;
  console.log(id);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          alt=""
          className="food-item-image"
        />

        {!cartItem[id] ? (
          <img
            onClick={() => addItem(id)}
            src={assets.add_icon_white}
            className="add"
            alt=""
          />
        ) : (
          <>
            <div className="food-item-counter">
              {combinedLoading ? (
                <ClipLoader
                  color="#FF6347"
                  loading={combinedLoading}
                  size={25}
                  id={id}
                />
              ) : (
                <>
                  <img
                    onClick={() => removeItem(id)}
                    src={assets.remove_icon_red}
                    alt=""
                  />
                  <p>{cartItem[id]}</p>
                  <img
                    onClick={() => addItem(id)}
                    src={assets.add_icon_green}
                    alt=""
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" className="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
