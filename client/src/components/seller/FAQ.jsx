"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Choose your favorite product, add it to your cart, and proceed to checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery and secure online payment options.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order anytime from your profile and orders section.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 3–7 business days depending on your location.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, you can cancel your order before it has been shipped.",
  },
  {
    question: "Can I return a product?",
    answer: "Eligible products can be returned according to our return policy.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team through the Contact Us section.",
  },
  {
    question: "What if my product arrives damaged?",
    answer:
      "Contact us as soon as possible with photos of the damaged product.",
  },
  {
    question: "Can I change my delivery address?",
    answer:
      "Yes, you can update your delivery address before your order is shipped.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "An account helps you manage orders, track deliveries, and view your order history.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full bg-[#fafafa] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
            Help Center
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-500">
            Everything you need to know about shopping with us.
          </p>
        </div>

        {/* FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-5 text-left"
              >
                <span className="truncate font-semibold text-gray-800">
                  {faq.question}
                </span>

                <span className="ml-4 text-xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="px-5 pb-5 text-sm leading-6 text-gray-500">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
