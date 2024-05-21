/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext();

function StoreProvider({ children }) {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartAddLoading, setCartAddLoading] = useState(false);
  const [cartRemLoading, setCartRemLoading] = useState(false);
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  /////add item
  const addItem = async (itemId) => {
    try {
      if (!cartItem[itemId]) {
        setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }

      if (token) {
        setCartAddLoading(true);
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setCartAddLoading(false);
    }
  };

  ////remove item
  const removeItem = async (itemId) => {
    try {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

      if (token) {
        setCartRemLoading(true);
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setCartRemLoading(false);
    }
  };

  /////////get item
  function getTotalCartAmount() {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }

    return totalAmount;
  }

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItem(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        await fetchFoodList();

        const token = localStorage.getItem("token");
        if (token) {
          setToken(token);
          await loadCartData(token); // Ensure this is awaited for proper error handling
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cartItem,
        food_list,
        addItem,
        removeItem,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoading,
        setIsLoading,
        cartAddLoading,
        setCartAddLoading,
        cartRemLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

function useStores() {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error("context used outside of scope");
  return context;
}

export { StoreProvider, useStores };
