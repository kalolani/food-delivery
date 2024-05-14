/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

const StoreContext = createContext();

function StoreProvider({ children }) {
  const [cartItem, setCartItem] = useState({});

  function addItem(itemId) {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  }

  function removeItem(itemId) {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }
  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  return (
    <StoreContext.Provider value={{ cartItem, food_list, addItem, removeItem }}>
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
