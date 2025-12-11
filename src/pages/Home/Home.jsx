import React from "react";
import Slider from "../../components/Home/Slider";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialsSlider from "../../components/Home/TestimonialsSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs ";
import FAQSection from "../../components/Home/FAQSection";
import HomePageLoan from "../../components/Home/HomePageLoan";

const Home = () => {
  return (
    <div>
      <Slider />
      <HomePageLoan />

      <HowItWorks />
      <TestimonialsSlider />
      <WhyChooseUs />
      <FAQSection />
    </div>
  );
};

export default Home;
