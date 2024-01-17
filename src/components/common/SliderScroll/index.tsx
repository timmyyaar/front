"use client";
import React, { FC, useRef } from 'react';

import { LeftArrow } from './icons/LeftArrow';
import { RightArrow } from './icons/RightArrow';
import './style.scss';

interface Props {
	elements: {
		id: number | string;
		content: () => JSX.Element;
	}[];
	step?: number;
	status?: boolean;
};

export const Slider: FC<Props> = (props) => {
  const { elements } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSmoothScroll = (direction: 'right' | 'left') => {
    if (scrollContainerRef.current) {
      const scrollAmount = (30 / 100) * scrollContainerRef.current.scrollWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const directionMultiplier = direction === 'right' ? 1 : -1;

      scrollContainerRef.current.classList.add('animated-scroll');
      scrollContainerRef.current.scrollLeft = scrollLeft + (scrollAmount * directionMultiplier);
      scrollContainerRef.current.classList.remove('animated-scroll');
    }
  };

	return (
		<div className="slider-scroll-wrapper">
			<div className="arrow-button arrow-button-left" onClick={() => handleSmoothScroll('left')}>
				<LeftArrow />
			</div>
			<div className="slider-component" ref={scrollContainerRef}>
				<div className="_mb-6">
					<div className="_flex">
						{elements.map((el) => (
							<div className="_flex-shrink-0 _w-1/4 _flex _items-center _justify-center" key={el.id}>
								{el.content()}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="arrow-button arrow-button-right" onClick={() => handleSmoothScroll('right')}>
				<RightArrow />
			</div>
		</div>
	);
};
