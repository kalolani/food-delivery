import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext();

function StoreProvider({ children }) {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartAddLoading, setCartAddLoading] = useState(false);
  const [cartRemLoading, setCartRemLoading] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const url = "https://food-delivery-backend-yr23.onrender.com";
  const [food_list, setFoodList] = useState([]);
  const [menu_list, setMenuList] = useState([]);
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState("home");
  const [catagory, setCatagory] = useState("All");
  const tx_ref = "tx-myecommerce12345-" + Date.now();
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const fetchCategoryList = async () => {
    const response = await axios.get(url + "/api/category/list");
    setMenuList(response.data.data);
  };
  /////add item
  const addItem = async (itemId) => {
    try {
      if (!cartItem[itemId]) {
        setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      console.log(cartItem);

      if (token) {
        setCartAddLoading(true);
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure the correct token format
            },
          }
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
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure the correct token format
            },
          }
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
        totalAmount += itemInfo?.price * cartItem[item];
      }
    }

    return totalAmount;
  }
  let cartNumber = 0;
  function getCartNumber() {
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        cartNumber += cartItem[item];
      }
    }

    return cartNumber;
  }
  console.log(getCartNumber());

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the correct token format
        },
      }
    );
    setCartItem(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        await fetchFoodList();
        await fetchCategoryList();

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
        isRated,
        setIsRated,
        cartNumber,
        getCartNumber,
        menu_list,
        image,
        setImage,
        tx_ref,
        menu,
        setMenu,
        catagory,
        setCatagory,
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
