"use client";

import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface Props {
  elements: JSX.Element[];
}

const MobileSwiper: FC<Props> = (props) => {
  const { elements } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="mobile-swiper-wrapper _my-4">
      <Swiper
        onSlideChange={({ realIndex }) => setCurrentSlide(realIndex)}
        spaceBetween={20}
        loop
      >
        {elements.map((element, index) => (
          <SwiperSlide key={index}>{element}</SwiperSlide>
        ))}
      </Swiper>
      <div className="_mt-3 _flex _justify-center _gap-2">
        {Array.from({ length: elements.length }, (_, index) => {
          const subElement = currentSlide === index;

          return (
            <div
              className={`slider-status _w-12 _h-2.5 _rounded-full _bg-primary
                _transition-all _duration-500 ${
                  subElement ? "" : "_w-2.5 _h-2.5 _bg-light"
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
