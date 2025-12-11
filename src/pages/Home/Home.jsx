import React from "react";
import Slider from "../../components/Home/Slider";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialsSlider from "../../components/Home/TestimonialsSlider";

const Home = () => {
  return (
    <div>
      <Slider />
      <HowItWorks />
      <TestimonialsSlider />
    </div>
  );
};

export default Home;
