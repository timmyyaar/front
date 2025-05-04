"use client";

import React, { useState, type JSX } from "react";

import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";

interface SliderStepProps {
  elements: JSX.Element[];
  itemsPerPage?: number;
}

const SliderStep = ({ elements, itemsPerPage = 4 }: SliderStepProps) => {
  const [transform, setTransform] = useState(0);

  const maximumTransform =
    (elements.length - itemsPerPage) * (100 / itemsPerPage);

  const nextSlide = () => {
    const newTransform = transform + 100 / itemsPerPage;

    if (newTransform <= maximumTransform) {
      setTransform(newTransform);
    } else {
      setTransform(0);
    }
  };

  const prevSlide = () => {
    const newTransform = transform - 100 / itemsPerPage;

    setTransform(newTransform < 0 ? 0 : newTransform);
  };

  return (
    <div className="relative">
      <div
        className="group cursor-pointer absolute top-1/2 -translate-y-2/4 -left-12"
        onClick={prevSlide}
      >
        <LeftArrow className="group-hover:text-primary transition-all" />
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${transform}%)`,
          }}
        >
          {elements.map((el, index) => (
            <div
              className={`flex-shrink-0 w-1/${itemsPerPage} flex items-center justify-center`}
              key={index}
            >
              {el}
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
  );
};

export default SliderStep;
