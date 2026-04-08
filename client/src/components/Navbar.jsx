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
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink onClick={() => setOpen(false)} to="/">
        <img src={assets.logo} className="h-9" alt="" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

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
            {/* Profile Icon */}
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-14 h-14 rounded-full cursor-pointer border-2 border-green-500 p-1 hover:scale-105 transition"
            />

            {/* Dropdown Menu */}
            <ul
              className="absolute right-0 mt-3 w-52 bg-white border border-green-100 rounded-xl shadow-lg py-2 text-gray-700 
                 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50"
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
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="" />
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div
          className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>

          {user && (
            <NavLink to="/" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2  bg-green-500 hover:bg-green-600  transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2  bg-green-500 hover:bg-green-600  transition text-white rounded-full text-sm"
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
