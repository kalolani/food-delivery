import "./Cart.css";
import { useStores } from "../../contexts/storeContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineXCircle } from "react-icons/hi2";

function Cart() {
  const { food_list, cartItem, removeItem, getTotalCartAmount, url } =
    useStores();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item" key={item._id}>
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} ETB</p>
                  <p>{cartItem[item._id]}</p>
                  <p>{item.price * cartItem[item._id]} ETB</p>
                  <p onClick={() => removeItem(item._id)} className="cross">
                    <HiOutlineXCircle color="red" size={20} />
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>{getTotalCartAmount()} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} ETB
              </p>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            {/* <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
