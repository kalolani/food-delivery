import { useStores } from "../../contexts/storeContext";
import "./PlaceOrder.css";

function PlaceOrder() {
  const { getTotalCartAmount } = useStores();

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last name" />
        </div>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="phone" />
      </div>
      <div className="place-order-right">
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
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
