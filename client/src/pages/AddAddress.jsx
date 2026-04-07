import React, { useState } from "react";
import { assets } from "../assets/assets";

/* INPUT FIELD COMPONENT */
const InputField = ({ type, placeHolder, name, handleChange, address }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      className="
        w-full
        border border-gray-300
        px-4 py-3
        rounded-xl
        text-sm
        outline-none
        focus:ring-2 focus:ring-black/60
        focus:border-black
        transition
      "
    />
  );
};

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(address);
  };

  return (
    /* 🌿 Page Wrapper */
    <div className="min-h-screen flex items-center justify-center bg-gray-100px-4">
      {/* 🌸 Main Container */}
      <div className="w-full max-w-7xl bg-green-200/20 rounded-3xl shadow-xl p-8 md:p-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold">
            Add Shipping <span className="text-gray-500">Address</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Please fill in your delivery details
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-14">
          {/* 📝 FORM */}
          <div className="w-full max-w-md">
            <form onSubmit={onSubmitHandler} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="firstName"
                  type="text"
                  placeHolder="First Name"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="lastName"
                  type="text"
                  placeHolder="Last Name"
                />
              </div>

              <InputField
                handleChange={handleChange}
                address={address}
                name="email"
                type="email"
                placeHolder="Email Address"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="street"
                type="text"
                placeHolder="Street Address"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="city"
                  type="text"
                  placeHolder="City"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="state"
                  type="text"
                  placeHolder="State"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="zipcode"
                  type="number"
                  placeHolder="Zip Code"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="country"
                  type="text"
                  placeHolder="Country"
                />
              </div>

              <InputField
                handleChange={handleChange}
                address={address}
                name="phone"
                type="number"
                placeHolder="Phone Number"
              />

              <button
                type="submit"
                className="
                  w-full
                  bg-black
                  text-white
                  py-3
                  rounded-xl
                  font-medium
                  hover:bg-gray-900
                  active:scale-[0.98]
                  transition
                "
              >
                Save Address
              </button>
            </form>
          </div>

          {/* 🖼 IMAGE */}
          <div className="hidden lg:block">
            <img
              src={assets.add_address_iamge}
              alt="Add Address"
              className="w-80 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
