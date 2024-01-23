import React, { Fragment } from 'react';

import { DiscountCoupon } from './icons/DiscountCoupon';
import { IconCrosse } from './icons/IconCrosse';
import './style.scss';

const services = [
  { id: 1, title: 'Cleaning 1-roomed apartment' },
  { id: 2, title: 'Cleaning' },
  { id: 3, title: '1-roomed apartment' },
  { id: 4, title: 'Roomed apartment' },
  { id: 5, title: 'Apartment' },
]

export const Summary = (props: any) => {
  const { title, counter, t } = props;
  return (
    <div className="summary-wrapper _flex _flex-col">
      <div className="summary-title">
        {t(title + '_summary_title')}
      </div>
      <div className="summary-counter">
        {console.log(counter)}
        {/* @ts-ignore */}
        {counter.map((el, i) => el.type === 'counter' ? (
          <div key={el.title + el.value + i}>
            {t(el.title)}<b>{el.value}</b>{el.param ? <>m<sup>2</sup></> : ''}
          </div>
        ) : (
          <div key={el.title + el.value + i}>
            {t(el.value)}
          </div>
        ))}
      </div>
      <div className="services-in-summary">
        {services.map((el) => (
          <div className="service-item _flex _items-center" key={el.id}>
            <div>{el.title}</div>
            <div className="icon-wrapper _cursor-pointer">
              <IconCrosse />
            </div>
          </div>
        ))}
      </div>
      <div>
        {t('Estimated Duration of service:')}
      </div>
      <div className="input-promo-code _cursor-pointer">
        <div className="input-wrapper _flex">
          <div className="icon-wrapper">
            <DiscountCoupon />
          </div>
          <input className="input" type="text" />
          <div className="button-wrapper">
            Apply
          </div>
        </div>
      </div>
      <div className="to-pay-wrapper _flex _items-baseline">
        <div className="title">To pay:</div>
        <div className="current-price">128zl</div>
        <div className="old-price">160zl</div>
      </div>
      <div className="order-wrapper _cursor-pointer">
        Order
      </div>
    </div>
  );
};