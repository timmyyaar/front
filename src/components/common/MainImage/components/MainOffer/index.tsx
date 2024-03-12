import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { CheckSvg } from './icons/check-fill';
import vector from './icons/vector.svg';
import './style.scss';

export const MainOffer: FC<any> = (props) => {
  const { t, handleScroll } = props;
  const router = useRouter();
  const advantages = [
    { title: 'Clear', text: 'space' },
    { title: 'Professional', text: 'service' },
    { title: 'Fair', text: 'price' },
  ];

  return (
    <>
      <div className="vector-wrapper mobile-none">
        <Image src={vector} alt="" />
        <div className="offer-wrapper">
          <div className="title main-title">
            <b>{t('Service')}</b>
          </div>
          <div className="title sub-title">
            {t('to suit your')}
          </div>
          <div className="title main-title">
            <b>{t('needs')}</b>
          </div>
          <div className="_mt-5 _flex _gap-5">
          {advantages.map(el => (
            <div className='advantages-block _flex _gap-3' key={el.title}>
              <CheckSvg />
              <div>
                <div className="advantages-title">{t(el.title)}</div>
                <div className="advantages-text">{t(el.text)}</div>
              </div>
            </div>
          ))}
          </div>
          <div className="_mt-10 _flex _gap-6">
            <div className="main-button _cursor-pointer" onClick={() => router.push('/order')}>
              {t('Order online now')}
            </div>
            <div
              className="sub-button _cursor-pointer"
              onClick={() => handleScroll('costs-block')}
            >
              {t('Pricing')}
            </div>
          </div>
        </div>
      </div>
      <div className="main-offer-wrapper-mobile">
        <div className="main-button _cursor-pointer" onClick={() => router.push('/order')}>
          {t('Order')}
        </div>
        <div
          className="sub-button _cursor-pointer"
          onClick={() => handleScroll('costs-block')}
        >
          {t('Pricing')}
        </div>
      </div>
    </>
  );
};
