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

  const onRemoveSubService = (title: string) => {
    setSubService((oldSubServices: any) => {
      return oldSubServices.filter((el: ISubService) => el.title !== title);
    });
  }

  const getSubServices = (data: ISubService[]) => {
    const result: string[] = [];

    data.forEach((el: any) => {
      if (!result.includes(el.title)) result.push(el.title);
    });

    return result;
  };

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
      {getSubServices(subService).length ? (
        <div className="services-in-summary">
          <div className="title-sub-service-title">
            {t('Add services')}
          </div>
          {getSubServices(subService).map((title: string, i: number) => (
            <div className="service-item _flex _items-center" key={title + i}>
              <div>{`${t(title)} (${subService.filter((el: ISubService) => el.title === title).length})`}</div>
              <div className="icon-wrapper _cursor-pointer" onClick={() => onRemoveSubService(title)}>
                <IconCrosse />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="estimated-wrapper">
        {`${t('Estimated Duration of service:')} `}<b>{0}</b>
      </div>
      <div className="input-promo-code _cursor-pointer">
        <div className="input-wrapper _flex">
          <div className="icon-wrapper">
            <DiscountCoupon />
          </div>
          <input className="input" type="text" />
          <div className="button-wrapper">
            {t('Apply')}
          </div>
        </div>
      </div>
      <div className="to-pay-wrapper _flex _items-baseline">
        <div className="title">To pay:</div>
        <div className="current-price">128 zl</div>
        <div className="old-price">160 zl</div>
      </div>
      <div className="order-wrapper _cursor-pointer">
        {t('Order')}
      </div>
    </div>
  );
};