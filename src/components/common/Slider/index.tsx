"use client";
import React, { FC, useState, type JSX } from "react";

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
    <div className="relative">
      <div>
        <div className="mb-6 relative">
          <div
            className={`group cursor-pointer absolute top-1/2
              -translate-y-2/4 -left-12`}
            onClick={prevSlide}
          >
            <LeftArrow className="group-hover:text-primary transition-all" />
          </div>
          <div className="overflow-hidden">
            <div
              className={`grid grid-rows-2 grid-flow-col
                gap-y-4 transition-transform duration-500 ease-in-out`}
              style={{
                transform: `translateX(-${currentSlide * 25}%)`,
                gridTemplateColumns: `repeat(${lengthDivider}, ${100 / step}%)`
              }}
            >
              {elements.map((item, index) => (
                <div
                  className={`w-full flex-shrink-0 w-1/4 flex
                   px-2.5 items-center justify-center`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            className="group cursor-pointer absolute top-1/2 -translate-y-2/4 -right-12"
            onClick={nextSlide}
          >
            <RightArrow className="group-hover:text-primary transition-all" />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: lengthDivider / step }, (_, i) => {
            const subElement = currentSlide / step === i;

            return (
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  subElement ? "w-12 bg-primary" : "w-2.5 bg-light"
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
