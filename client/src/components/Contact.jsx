import React, { useReducer, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        alert("Email Send Successfully");
      });
    formRef.current.reset();
    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-3">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-8">Get In Touch</h2>

            <div className="space-y-6">
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-500">support@grocerymart.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-gray-500">+91 9876543210</p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-500">
                  123 Market Street, Kolkata, West Bengal, India
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-900">Business Hours</p>
                <p className="text-gray-500">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="mt-10">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45f"
                alt="Contact"
                className="rounded-2xl h-64 w-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-8">Send Us A Message</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="from_email"
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:border-green-500"
                />
              </div>

              <button
                disabled={isSending}
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition"
              >
                {isSending ? "Sending" : "Send us a Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
