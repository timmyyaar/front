"use client";

import React, { FC, useState, type JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface Props {
  elements: JSX.Element[];
}

const MobileSwiper: FC<Props> = (props) => {
  const { elements } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="mobile-swiper-wrapper my-4">
      <Swiper
        onSlideChange={({ realIndex }) => setCurrentSlide(realIndex)}
        spaceBetween={20}
        loop
      >
        {elements.map((element, index) => (
          <SwiperSlide key={index}>{element}</SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-3 flex justify-center gap-2">
        {Array.from({ length: elements.length }, (_, index) => {
          const subElement = currentSlide === index;

          return (
            <div
              className={`slider-status w-12 h-2.5 rounded-full bg-primary
                transition-all duration-500 ${
                  subElement ? "" : "w-2.5 h-2.5 bg-light"
                }`}
              key={"slider-status" + index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MobileSwiper;
