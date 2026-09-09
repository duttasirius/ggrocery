import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get("/api/newsletter/all");

      if (res.data.success) {
        setSubscribers(res.data.subscribers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Newsletter Subscribers</h1>

      <div className="bg-white rounded shadow">
        {subscribers.map((item, index) => (
          <div key={index} className="border-b p-4 flex justify-between">
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterAdmin;
