import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const TestimonialsSlider = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const [testimonials, setTestimonials] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosSecure.get("/testtimonials");
        setTestimonials(res.data);
      } catch (error) {
        toast.error("Error fetching testtimonials:", error);
      }
    };
    fetchTestimonials();
  }, [axiosSecure]);

  return (
    <section className="py-16 container mx-auto px-3 hidden md:block">
      {/* Title Section */}
      <div className="text-center mb-16">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What{" "}
            <span className="text-emerald-500">Our Customers Are Saying!</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {" "}
            Choose from our popular loan products designed for car, home,
            education, farming, and wedding needs. Quick approval, competitive
            rates, and flexible repayment options available.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
          <span className="text-[#059383]"> </span>{" "}
          <span className="text-[#059383]"> </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12"></p>

        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl md:text-5xl"></h1>
        </div>

        {/* ----------*** :: SLIDER :: ***---------- */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active custom-active",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-12"
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <TestimonialCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
