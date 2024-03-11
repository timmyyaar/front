"use client";
import React, { useState } from 'react';
import Image from 'next/image';

import { Overlay } from '@/components/common/Overlay';
import { Slider } from '@/components/common/SliderScroll';
import { Writer } from '@/components/common/Writer';
import { useClickOutside } from '@/hooks/useClickOutSide';
import { CloseSvg } from '@/components/common/icons/closeButton';

import { DiscountItem } from './DiscountItem';
import giftSvg from './images/gift.svg';
import parentAndChildrenSvg from './images/parent-and-children.svg';
import studentSvg from './images/student.svg';
import './style.scss';

export const Promotions = (props: any) => {
  const { t } = props;
  const [active, setActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  const promotions = [
    { img: giftSvg, text: 'Make the first', text2: 'order Promo code', text3: 'TYT - 20%', text4: 'off your first order' },
    { img: studentSvg, text: 'Students', text2: ', save big on your cleaning services with us! Use promo code', text3: 'STUDENTCLEAN', text4: 'for', text5: '10%', text6: 'off'},
    { img: parentAndChildrenSvg, text: 'Large family?', text2: 'Enjoy more family time, less cleaning time. Get', text3: '10%', text4: 'off with promo code', text5: 'FAMILYCLEAN' },
  ];

  const discounts = [
    { save: '-15%', services: ['Cleaning', 'Ozonation'] },
    { save: '-15%', services: ['Cleaning', 'Dry cleaning'] },
    { save: '-15%', services: ['Eco cleaning', 'Dry cleaning'] },
    { save: '-15%', services: ['Eco cleaning', 'Ozonation'] },
    { save: '-15%', services: ['Move in/out', 'Ozonation'] },
    { save: '-15%', services: ['Move in/out', 'Dry cleaning'] },
    { save: '-15%', services: ['Construction', 'Ozonation'] },
    { save: '-20%', services: ['Dry cleaning', 'Ozonation'] },
  ];

  const ref = useClickOutside(() => setActive(false));

  const setActivePopup = (title: string) => {
    setPopupTitle(title);
    setActive(true);
  }

  return (
    <>
      <div className="promotions-component _flex _flex-col mobile-none">
        <Overlay active={active}>
          <div className="overlay-wrapper-component" ref={ref}>
            <div className="icon-wrapper _cursor-pointer" onClick={() => setActive(false)}>
              <CloseSvg />
            </div>
            <div className="overlay-wrapper-component-title">
              <Writer text={t(popupTitle + '_title')} />
            </div>
            <div className="overlay-wrapper-component-text">
              <Writer text={t(popupTitle + '_text')} />
            </div>
          </div>
        </Overlay>
        <div className="title">{t('Promotions and discounts')}</div>
        <div className="promotions-block _flex _justify-around">
          {promotions.map((el, i) => (
            <div className="promotion-card" key={el.text + i}>
              <div className="_flex _justify-center">
                <Image src={el.img} alt='' />
              </div>
              <div className="text">
                <b><Writer text={t(el.text)} /></b>
                {el.text2 && <Writer text={t(el.text2)} />}
                <b>{el.text3 && <Writer text={t(el.text3)} />}</b>
                {el.text4 && <Writer text={t(el.text4)} />}
                <b>{el.text5 && <Writer text={t(el.text5)} />}</b>
                {el.text6 && <Writer text={t(el.text6)} />}
              </div>
            </div>
          ))}
        </div>
        <div className="discounts-wrapper" style={{ display: 'none' }}>
          <Slider
            elements={discounts.map((el, i) => ({
              id: el.services.join('n' + i),
              content: (): JSX.Element => (
                <DiscountItem discount={{ ...el, key: el.services.join('n' + i) }} t={t} onActive={setActivePopup} />
              )
            }))}
            status={false}
          />
        </div>
      </div>
      <div className="promotions-component-mobile">
        <div className="promotions-title-wrapper">
          {t('promotions_title_mobile1')}
        </div>
        <div className="content-mobile-wrapper">
          {promotions.map((el, i) => (
            <div className="promotion-card" key={el.text + i}>
              <div className="_flex _justify-center">
                <Image src={el.img} alt='' />
              </div>
              <div className="text">
                <b><Writer text={t(el.text + '_mobile')} /></b>
                {el.text2 && <Writer text={t(el.text2 + '_mobile')} />}
                <b>{el.text3 && <Writer text={t(el.text3 + '_mobile')} />}</b>
                {el.text4 && <Writer text={t(el.text4 + '_mobile')} />}
                <b>{el.text5 && <Writer text={t(el.text5 + '_mobile')} />}</b>
                {el.text6 && <Writer text={t(el.text6 + '_mobile')} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};
