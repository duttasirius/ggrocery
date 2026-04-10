import { useEffect, useState } from "react";
import { assets, dummyOrders } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto h-[95vh] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-10 space-y-8">
        {/* Header */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Orders
        </h2>

        {/* Orders */}
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 space-y-5"
          >
            {/* Top Section */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <img src={assets.box_icon} alt="box" className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Order #{index + 1}</p>

                {/* Items */}
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-gray-800 font-medium">
                      {item.product.name}
                      <span className="ml-2 text-sm text-gray-500">
                        × {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t"></div>

            {/* Middle Section */}
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              {/* Address */}
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  Delivery Info
                </p>
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* Payment */}
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  Payment Details
                </p>
                <p>Method: {order.paymentType}</p>
                <p>Date: {order.orderDate}</p>

                <p className="flex items-center gap-2">
                  Status:
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">
                ${order.amount}
              </p>

              <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
