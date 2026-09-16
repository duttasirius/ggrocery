import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  });

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="relative z-[100] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
      <NavLink onClick={() => setOpen(false)} to="/">
        <img src={assets.logo} className="h-9" alt="" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} className="w-4 h-4" alt="" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative inline-block group">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-14 h-14 rounded-full cursor-pointer border-2 border-green-500 p-1 hover:scale-105 transition"
            />

            <ul
              className="absolute right-0 mt-3 w-52 bg-white border border-green-100 rounded-xl shadow-lg py-2 text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50"
            >
              <li
                onClick={() => navigate("/my-orders")}
                className="px-4 py-2 hover:bg-green-100 hover:text-green-700 cursor-pointer transition"
              >
                My Orders
              </li>

              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-green-100 hover:text-red-500 cursor-pointer transition"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menu"
          className="relative z-[110]"
        >
          <img src={assets.menu_icon} alt="" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 z-[105] flex w-full flex-col items-start gap-2 border-t border-gray-100 bg-white px-5 py-4 text-sm shadow-lg md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="mt-2 cursor-pointer rounded-full bg-green-500 px-6 py-2 text-sm text-white transition hover:bg-green-600"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="mt-2 cursor-pointer rounded-full bg-green-500 px-6 py-2 text-sm text-white transition hover:bg-green-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
