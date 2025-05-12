import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import {Link} from 'react-router-dom'

export function Slider() {
  const slides = [
    {
      title: "Mobile And Laptop",
      subtitle: "Accessories",
      description:
        "Get the best accessories for your computer and laptop. High-quality, durable, and affordable.",
      image: "https://i.ibb.co/b5LLTMsp/mobile-category.png",
    },
    {
      title: "Ipads & Gadgets",
      subtitle: "Latest Technology",
      description:
        "Discover the newest arrivals in smartphones and tech gadgets. Designed for performance and style.",
      image: "https://i.ibb.co/YFfytdVV/ipad-slide.jpg",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop={true}
      className="w-full max-w-6xl mx-auto"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 gap-6 sm:gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[200px] sm:w-[240px] md:w-[300px] object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 sm:space-y-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-700">
                {slide.title}
              </h4>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-700">
                {slide.subtitle}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {slide.description}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base rounded-md transition-colors duration-300">
               <Link to='/mobile'>Shop Now</Link> 
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}