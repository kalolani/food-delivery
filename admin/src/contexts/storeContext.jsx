/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

function StoreProvider({ children }) {
  const [token, setToken] = useState("");
  const [totalAmountSold, setTotalAmountSold] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [image, setImage] = useState(null);
  const url = "https://food-delivery-backend-yr23.onrender.com";

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (token) {
          setToken(token);
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
        url,
        token,
        setToken,
        isLoading,
        setIsLoading,
        totalAmountSold,
        setTotalAmountSold,
        message,
        setMessage,
        image,
        setImage,
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
