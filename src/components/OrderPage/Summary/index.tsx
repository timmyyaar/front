import React, { FC } from 'react';

import { ISubService } from '../SubServicesList/utils';
import { DiscountCoupon } from './icons/DiscountCoupon';
import { IconCrosse } from './icons/IconCrosse';
import './style.scss';

interface IProps {
  title: string;
  counter: { title: string; value: string; type?: string; param?: string }[];
  subService: ISubService[];
  setSubService: (service: any) => void;
  t: any;
}

export const Summary: FC<IProps> = (props: any) => {
  const { title, counter, subService, setSubService, t } = props;

  const onRemoveSubService = (service: ISubService) => {
    setSubService((oldSubServices: any) => {
      const newServices = [...oldSubServices];
      const index = newServices.findIndex((el: any) => el.title === service.title);
      newServices.splice(index, 1);
      return newServices;
    });
  }

  return (
    <div className="summary-wrapper _flex _flex-col">
      <div className="summary-title">
        {t(title + '_summary_title')}
      </div>
      <div className="summary-counter">
        {counter.map((el: any, i: number) => el.type === 'counter' ? (
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
        {subService.map((el: ISubService, i: number) => (
          <div className="service-item _flex _items-center" key={JSON.stringify(el) + i}>
            <div>{el.title}</div>
            <div className="icon-wrapper _cursor-pointer" onClick={() => onRemoveSubService(el)}>
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