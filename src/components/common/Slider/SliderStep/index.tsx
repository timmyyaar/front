"use client";

import React, { useState } from "react";

import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";
import "../style.scss";

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
    <div className="slider-wrapper">
      <div className="arrow-button arrow-button-left" onClick={prevSlide}>
        <LeftArrow />
      </div>
      <div className="slider-component">
        <div
          className="_flex _transition-transform _duration-500 ease-in-out"
          style={{
            transform: `translateX(-${transform}%)`,
          }}
        >
          {elements.map((el, index) => (
            <div
              className={`_flex-shrink-0 _w-1/${itemsPerPage} _flex _items-center _justify-center`}
              key={index}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="arrow-button arrow-button-right" onClick={nextSlide}>
        <RightArrow />
      </div>
    </div>
  );
};

export default SliderStep;
