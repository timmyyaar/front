"use client";
import React, { FC, useState, type JSX } from "react";

import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";

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
    <div className="_relative">
      <div
        className="_group _cursor-pointer _absolute _top-1/2 _-translate-y-2/4 _-left-12"
        onClick={() => setHighlightedItemIndex(previousItemIndex)}
      >
        <LeftArrow className="group-hover:_text-primary _transition-all" />
      </div>
      <div className="_overflow-hidden">
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
        className="_group _cursor-pointer _absolute _top-1/2 _-translate-y-2/4 _-right-12"
        onClick={() => setHighlightedItemIndex(nextItemIndex)}
      >
        <RightArrow className="group-hover:_text-primary _transition-all" />
      </div>
    </div>
  );
};

export default SliderSwitch;
