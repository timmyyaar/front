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
    <div className="relative">
      <div
        className="group cursor-pointer absolute top-1/2 -translate-y-2/4 -left-12"
        onClick={() => setHighlightedItemIndex(previousItemIndex)}
      >
        <LeftArrow className="group-hover:text-primary transition-all" />
      </div>
      <div className="overflow-hidden">
        <div className="flex">
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center opacity-60">
            {elements[previousItemIndex]}
          </div>
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center">
            {elements[highlightedItemIndex]}
          </div>
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center opacity-60">
            {elements[nextItemIndex]}
          </div>
        </div>
      </div>
      <div
        className="group cursor-pointer absolute top-1/2 -translate-y-2/4 -right-12"
        onClick={() => setHighlightedItemIndex(nextItemIndex)}
      >
        <RightArrow className="group-hover:text-primary transition-all" />
      </div>
    </div>
  );
};

export default SliderSwitch;
