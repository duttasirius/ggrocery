import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
    setIsSeller(false);
  };

  return (
    <>
      {/* 🔝 Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={assets.logo} className="w-36 cursor-pointer" alt="logo" />
        </Link>

        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🧱 Layout */}
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* 📚 Sidebar */}
        <div className="md:w-64 w-16 border-r border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-green-500/10 border-green-500 text-green-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <img src={item.icon} className="w-7 h-7" alt={item.name} />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* 📦 Main Content */}
        <div className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
