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

  // FETCH USER AUTH STATUS - USER DATA & CART ITEMS
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success && data.user) {
        setUser(data.user);

        // Safely set cart items
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      setUser(null);
      setCartItems({});

      console.log("FETCH USER ERROR:", error);
    }
  };

  // FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list", {
        withCredentials: true,
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch products",
      );
    }
  };

  // ADD PRODUCT TO CART
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);

    toast.success("ADDED TO CART");
  };

  // UPDATE CART QUANTITY
  const updateCartItems = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems || {});

    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }

    setCartItems(cartData);

    toast.success("CART UPDATED");
  };

  // REMOVE FROM CART
  const removeFromCart = async (itemId) => {
    let cartData = structuredClone(cartItems || {});

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

    if (!cartItems) return 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }

    return totalCount;
  };

  // GET CART TOTAL AMOUNT
  const getCartAmount = () => {
    let totalAmount = 0;

    // Initialize total amount to 0
    if (!cartItems) return 0;

    // Loop through each item ID in cartItems object
    for (const items in cartItems) {
      // Find the product in products array whose _id matches the current item ID
      const itemInfo = products.find((product) => product._id === items);

      // Check if quantity > 0 AND product exists
      if (cartItems[items] > 0 && itemInfo) {
        // Add (price × quantity) to totalAmount
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    // Return the final calculated cart total
    return totalAmount;
  };

  // FETCH INITIAL DATA
  useEffect(() => {
    fetchSeller();
    fetchUser();
    fetchProducts();
  }, []);

  // UPDATE CART ON SERVER
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post(
          "/api/cart/update",
          { cartItems },
          { withCredentials: true },
        );

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to update cart",
        );
      }
    };

    // Only update cart when user is authenticated
    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

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
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
