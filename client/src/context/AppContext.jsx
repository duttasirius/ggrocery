import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // FETCH SELLER STATUS
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // ADD PRODUCT TO CART
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("ADDED TO CART");
  };

  // update cart quantity
  const updateCartItems = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;
    setCartItems(cartData);

    toast.success("CART UPDATED");
  };

  // REMOVE FROM CART
  const removeFromCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    toast.success("REMOVE FROM CART");
  };

  // GET CART ITEM COUNT
  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // GET CART TOTAL AMOUNT
  const getCartAmount = () => {
    let totalAmount = 0;
    // Initialize total amount to 0

    for (const items in cartItems) {
      // Loop through each item ID (key) in cartItems object

      let itemInfo = products.find((product) => product._id === items);
      // Find the product in products array whose _id matches the current item ID

      if (cartItems[items] > 0 && itemInfo) {
        // Check if quantity > 0 AND product exists

        totalAmount += itemInfo.offerPrice * cartItems[items];
        // Add (price × quantity) to totalAmount
      }
    }

    return totalAmount;
    // Return the final calculated cart total
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItems,
    removeFromCart,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
