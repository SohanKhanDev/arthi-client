import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { PiRocketLaunchLight } from "react-icons/pi";

import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import slider4 from "../../assets/slider4.jpg";
import slider5 from "../../assets/slider5.jpg";
import MyBtn from "../Shared/MyBtn";

const Slider = () => {
  const slides = [
    {
      image: slider1,
      title: "Car Loan",
      description:
        "Drive your dreams with our affordable car loans—quick approval, competitive rates, and flexible EMIs for your perfect vehicle.",
    },
    {
      image: slider2,
      title: "Home Loan",
      description:
        "Own your dream home with easy home loans tailored for first-time buyers and upgrades with low interest rates.",
    },
    {
      image: slider3,
      title: "Education Loan",
      description:
        "Fund your child's bright future with education loans covering tuition, books, and living expenses worldwide.",
    },
    {
      image: slider4,
      title: "Farmer Loan",
      description:
        "Grow your farm with farmer loans for seeds, equipment, and machinery at special agricultural rates.",
    },
    {
      image: slider5,
      title: "Wedding Loan",
      description:
        "Make your special day memorable with wedding loans covering venue, catering, and all celebrations hassle-free.",
    },
  ];

  return (
    <div className="w-full mx-auto px-4 my-6 rounded-2xl overflow-hidden relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-active",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div className="absolute top-1/4 left-6 sm:left-12 md:left-16 lg:left-24 text-left max-w-lg">
              <h1
                className="text-4xl md:text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-emerald-500"> {slide.title}</span>
              </h1>

              <p className="my-4 text-white text-sm sm:text-base md:text-lg drop-shadow-md">
                {slide.description}
              </p>

              <MyBtn
                to="/apply-loan"
                label="Apply Now"
                size="sm"
                icon={PiRocketLaunchLight}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
