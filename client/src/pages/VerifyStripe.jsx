import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
  const { backendUrl, setCartItems , token} = useContext(ShopContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      console.log("Verifying Payment:", {
        success,
        orderId,
      });

      const { data } = await axios.post(
        `${backendUrl}/api/order/verify-stripe`,
        {
          orderId,
          success,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Verify Response:", data);

      if (data.success) {
        setCartItems({});
        navigate("/my-orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("VERIFY PAYMENT ERROR:", error);
      navigate("/");
    }
  };

  useEffect(() => {
  console.log("TOKEN:", token);
  console.log("ORDER ID:", orderId);
  console.log("SUCCESS:", success);

  if (orderId && success) {
    verifyPayment();
  }
}, [token, orderId, success]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Verifying your payment...</p>
    </div>
  );
};

export default Verify;
