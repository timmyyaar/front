"use client";
import React, { FC, useState } from "react";

import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";
import "../style.scss";

interface Props {
  elements: JSX.Element[];
}

const SliderSwitch: FC<Props> = (props) => {
  const { elements } = props;
  const [highlightedItemIndex, setHighlightedItemIndex] = useState(0);

  const previousItemIndex = highlightedItemIndex
    ? highlightedItemIndex - 1
    : elements.length - 1;
  const nextItemIndex =
    highlightedItemIndex === elements.length - 1 ? 0 : highlightedItemIndex + 1;

  return (
    <div className="slider-scroll-wrapper">
      <div
        className="arrow-button arrow-button-left"
        onClick={() => setHighlightedItemIndex(previousItemIndex)}
      >
        <LeftArrow />
      </div>
      <div className="slider-component">
        <div className="_flex">
          <div className="_flex-shrink-0 _w-1/3 _flex _items-center _justify-center _opacity-60">
            {elements[previousItemIndex]}
          </div>
          <div className="_flex-shrink-0 _w-1/3 _flex _items-center _justify-center">
            {elements[highlightedItemIndex]}
          </div>
          <div className="_flex-shrink-0 _w-1/3 _flex _items-center _justify-center _opacity-60">
            {elements[nextItemIndex]}
          </div>
        </div>
      </div>
      <div
        className="arrow-button arrow-button-right"
        onClick={() => setHighlightedItemIndex(nextItemIndex)}
      >
        <RightArrow />
      </div>
    </div>
  );
};

export default SliderSwitch;
