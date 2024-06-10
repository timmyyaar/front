"use client";
import React, { FC, useState } from "react";

import { LeftArrow } from "./icons/LeftArrow";
import { RightArrow } from "./icons/RightArrow";

interface Props {
  elements: JSX.Element[];
  step?: number;
  status?: boolean;
  rowsCount?: number;
}

export const Slider: FC<Props> = (props) => {
  const { elements, step = 4, rowsCount = 2 } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const lengthDivider = Math.ceil(elements.length / rowsCount);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + step) % lengthDivider);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - step + lengthDivider) % lengthDivider
    );
  };

  return (
    <div className="_relative">
      <div>
        <div className="_mb-6 _relative">
          <div
            className={`_group _cursor-pointer _absolute _top-1/2
              _-translate-y-2/4 _-left-12`}
            onClick={prevSlide}
          >
            <LeftArrow className="group-hover:_text-primary _transition-all" />
          </div>
          <div className="_overflow-hidden">
            <div
              className={`_grid _grid-rows-2 _grid-flow-col
                _gap-y-4 _transition-transform _duration-500 ease-in-out`}
              style={{
                transform: `translateX(-${currentSlide * 25}%)`,
                gridTemplateColumns: `repeat(${lengthDivider}, ${100 / step}%)`
              }}
            >
              {elements.map((item, index) => (
                <div
                  className={`_w-full _flex-shrink-0 _w-1/4 _flex
                   _px-2.5 _items-center _justify-center`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            className="_group _cursor-pointer _absolute _top-1/2 _-translate-y-2/4 _-right-12"
            onClick={nextSlide}
          >
            <RightArrow className="group-hover:_text-primary _transition-all" />
          </div>
        </div>
        <div className="_flex _justify-center _gap-2">
          {Array.from({ length: lengthDivider / step }, (_, i) => {
            const subElement = currentSlide / step === i;

            return (
              <div
                className={`_h-2.5 _rounded-full _transition-all _duration-500 ${
                  subElement ? "_w-12 _bg-primary" : "_w-2.5 _bg-light"
                }`}
                key={"slider-status" + i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
