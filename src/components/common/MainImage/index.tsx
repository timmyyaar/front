import React from 'react';
import Image from 'next/image';

import mainPng from './images/main.png';
import { MainOffer } from './components/MainOffer';
import { SelectService } from './components/SelectService';
import './style.scss';

export const MainImage = (props: any) => {
  const { t, services, setService, common } = props;

  const handleScroll = (targetId: string) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="main-image-wrapper mobile-none">
        <Image src={mainPng} alt="" sizes='' fill style={{objectFit: 'cover', objectPosition: 'left bottom'}} priority />
        {common ? (
          <MainOffer t={t} handleScroll={handleScroll} />
        ) : (
          <SelectService t={t} services={services} setService={setService} />
        )}
      </div>
      <div className="main-image-wrapper-mobile">
        <Image src={mainPng} alt="" sizes='' fill style={{ objectFit: 'cover' }} priority />
        {common ? (
          <MainOffer t={t} handleScroll={handleScroll} />
        ) : (
          <SelectService
            services={services}
            setService={setService}
            t={t}
          />
        )}
      </div>
    </>
  )
};
