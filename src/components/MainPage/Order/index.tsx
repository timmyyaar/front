import React, { useState } from 'react';
import Image from 'next/image';

import Man from './icons/Man.svg';
import Women from './icons/Women.svg';
import { Calendar } from './Calendar';
import './style.scss';

export const Order = (props: any) => {
  const { t } = props;
  const [hover, setHover] = useState(false);

  return (
    <div className="order-wrapper _flex _justify-center">
      <div className="white-layout">
        <div className="title _flex _justify-center">
          {t('Order cleaning today')}
        </div>
        <div className="_flex _justify-center">
          <Calendar />
        </div>
        <div className={`man-icon-wrapper ${hover ? 'man-icon-wrapper-animated' : ''}`}>
          <Image src={Man} alt='' />
        </div>
        <div className={`woman-icon-wrapper ${hover ? 'woman-icon-wrapper-animated' : ''}`}>
          <Image src={Women} alt='' />
        </div>
        <div className="_flex _justify-center">
          <div className="button-wrapper" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {t('Order')}
          </div>
        </div>
      </div>
    </div>
  )
};
