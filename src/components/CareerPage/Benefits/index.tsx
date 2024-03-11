import React from 'react';
import Image from 'next/image';

import benefitSvg from './icons/benefit.svg';
import cleaningProductsSvg from './icons/cleaning-products.svg';
import clipPathGroupSvg from './icons/clip-path-group.svg';
import discountSvg from './icons/discount.svg';
import dollarSvg from './icons/dollar.svg';
import likeSvg from './icons/like.svg';
import mainPageSvg from './icons/main-page.svg';
import moneyBagSvg from './icons/money-bag.svg';
import peopleSvg from './icons/people.svg';
import timerSvg from './icons/timer.svg';
import tramSvg from './icons/tram.svg';
import './style.scss';

export const Benefits = ({ t }: any) => {
  const benefits = [
    { title: 'money-block', lines: 3, svg: moneyBagSvg },
    { title: 'time-block', lines: 3, svg: timerSvg },
    { title: 'opportunity-block', lines: 3, svg: mainPageSvg },
    { title: 'team-block', lines: 3, svg: peopleSvg },

    { title: 'supplies-block', lines: 3, svg: cleaningProductsSvg },
    { title: 'payment-block', lines: 3, svg: moneyBagSvg },
    { title: 'program-block', lines: 3, svg: likeSvg },
    { title: 'orders-block', lines: 3, svg: benefitSvg },

    { title: 'discount-block', lines: 2, svg: discountSvg },
    { title: 'team-buildings-block', lines: 2, svg: clipPathGroupSvg },
    { title: 'paid-commute-block ', lines: 2, svg: tramSvg },
    { title: 'courses-block', lines: 2, svg: dollarSvg },
  ];

  return (
    <div className="benefits-component _flex _flex-col _items-center _gap-6">
      <div className="benefits-list _grid _grid-cols-4 _gap-3">
        {benefits.map((el, i) => (
          <div className="benefit-wrapper _flex _flex-col _items-center _gap-4" key={el.title + i}>
            <Image src={el.svg} alt='' />
            <div className="benefit-text">
              {[...new Array(el.lines)].map((_, j) => (
                <div key={el.title + i + j}>{t(el.title + '_line_' + j)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};