import React, { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);

  const fetchMyOrders = async () => {
    setMyOrder(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 pb-16">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6">🧾 My Orders</h1>

      {myOrder.map((order, index) => (
        <div
          key={index}
          className="mb-8 p-5 border rounded-xl shadow-sm bg-white"
        >
          {/* 🔹 Order Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600 mb-4 border-b pb-3">
            <p>
              <span className="font-medium text-gray-800">Order ID:</span>{" "}
              {order._id}
            </p>

            <p>
              <span className="font-medium text-gray-800">Payment:</span>{" "}
              {order.paymentType}
            </p>

            <p className="md:text-right">
              <span className="font-medium text-gray-800">Total Amount:</span> ₹
              {order.amount}
            </p>
          </div>

          {/* 🔹 Items */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b last:border-none"
            >
              {/* Left: Image + Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image[0]}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg border"
                />

                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Category: {item.product.category}
                  </p>
                </div>
              </div>

              {/* Middle: Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>Quantity: {item.quantity || 1}</p>
                <p>
                  Status:{" "}
                  <span className="text-green-600 font-medium">
                    {order.status}
                  </span>
                </p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Right: Amount */}
              <p className="text-green-600 font-semibold text-lg">
                ₹{item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
