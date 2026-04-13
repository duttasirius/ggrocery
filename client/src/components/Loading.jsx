import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  let { search } = useLocation();

  const query = new URLSearchParams(search);

  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 6000);
    }
  }, [nextUrl]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>

      {/* Text */}
      <h2 className="mt-6 text-xl font-semibold text-gray-700">
        Processing Payment...
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Please wait while we confirm your transaction
      </p>
    </div>
  );
};

export default Loading;
