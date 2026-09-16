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
  }, [searchQuery, navigate]);

  const closeMenu = () => setOpen(false);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(null);
        closeMenu();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="relative z-[100] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
      <NavLink onClick={closeMenu} to="/">
        <img src={assets.logo} className="h-9" alt="GreenCart" />
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
          <img src={assets.search_icon} className="w-4 h-4" alt="Search" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="Cart" />
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

            <ul className="absolute right-0 mt-3 w-52 bg-white border border-green-100 rounded-xl shadow-lg py-2 text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
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
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" alt="Cart" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[120]"
        >
          {open ? (
            <span className="block text-3xl leading-none font-light text-gray-700">×</span>
          ) : (
            <img src={assets.menu_icon} alt="Menu" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[108] bg-black/25 transition-opacity duration-300 sm:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-[115] h-dvh w-[78%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
            <NavLink to="/" onClick={closeMenu}>
              <img src={assets.logo} className="h-9" alt="GreenCart" />
            </NavLink>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-2xl leading-none text-gray-600 transition hover:bg-green-100 hover:text-green-600"
            >
              ×
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </p>

            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-base text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-base text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                All Products
              </NavLink>

              {user && (
                <NavLink
                  to="/my-orders"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-base text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                >
                  My Orders
                </NavLink>
              )}

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-base text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                Contact
              </NavLink>
            </div>

            <div className="my-6 border-t border-gray-100" />

            {!user ? (
              <button
                onClick={() => {
                  closeMenu();
                  setShowUserLogin(true);
                }}
                className="w-full rounded-full bg-green-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full rounded-full bg-green-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
