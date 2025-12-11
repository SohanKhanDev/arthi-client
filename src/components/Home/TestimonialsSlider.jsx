import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
        console.error("Error fetching testtimonials:", error);
      }
    };
    fetchTestimonials();
  }, [axiosSecure]);
  console.log(testimonials);

  return (
    <section className="py-16 container mx-auto px-3 hidden md:block">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-primary">What </span>
          <span className="text-secondary">Our Customers Are Saying!</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Real stories from approved borrowers. Hear how our fast loan process,
          competitive rates, and reliable service helped them achieve their
          dreams and financial goals.
        </p>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
          <span className="text-primary"> </span>{" "}
          <span className="text-secondary"> </span>
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
