import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";
import OurPartners from "../components/OurPartners";
import Subscription from "../components/Subscription";
import FAQ from "../components/seller/FAQ";
import WhyChooseGreenCart from "../components/WhyChooseGreenCart";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <Testimonial />
      <OurPartners />
      <Subscription />
      <FAQ />
      <WhyChooseGreenCart />
      <NewsLetter />
    </div>
  );
};

export default Home;
