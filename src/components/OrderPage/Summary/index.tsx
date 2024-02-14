import React, { FC, useState } from 'react';

import { ISubService } from '../SubServicesList/utils';
import { IconCrosse } from './icons/IconCrosse';
import { PromoInput } from './PromoCodeInput';
import { UserData } from './UserData';
import { getEstimateFromCounterByService } from './utils';
import './style.scss';

interface IProps {
  title: string;
  counter: { title: string; value: string; type?: string; param?: string }[];
  subService: ISubService[];
  setSubService: (service: any) => void;
  secTitle: string;
  secCounter: { title: string; value: string; type?: string; param?: string }[];
  secSubService: ISubService[];
  setSecSubService: (service: any) => void;
  t: any;
}

export const Summary: FC<IProps> = (props: any) => {
  const {
    title, counter, subService, setSubService,
    secTitle, secCounter, secSubService, setSecSubService,
    t,
  } = props;
  const [sale, setSale] = useState(0);
  const [order, setOrder] = useState(false);

  const onRemoveSubService = (title: string, sec: boolean) => {
    if (!sec) {
      setSubService((oldSubServices: any) => {
        return oldSubServices.filter((el: ISubService) => el.title !== title);
      });
    } else {
      setSecSubService((oldSubServices: any) => {
        return oldSubServices.filter((el: ISubService) => el.title !== title);
      });
    }
  }

  const getSubServices = (data: ISubService[]) => {
    const result: string[] = [];

    data.forEach((el: any) => {
      if (!result.includes(el.title)) result.push(el.title);
    });

    return result;
  };

  const getEstimate = () => {
    console.log(title, counter);
    const countEstimate = getEstimateFromCounterByService(title, counter);
    const subServiceEstimate = subService.reduce((acc: number, el: ISubService) => acc += el?.time, 0);
    let total = countEstimate + subServiceEstimate;
    if (total > 360) total = total / 2;

    return `${Math.floor(total / 60)}h, ${total % 60}m`;
  };

  const getNewPrice = (originalPrice: number, discountPercentage: number) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;

    return discountedPrice.toFixed(2);
  }

  const renderSummeryService = ({ serviceTitle, counterValue, subServiceList, sec = false }: any) => (
    <>
      <div className="summary-title">
        {t(serviceTitle + '_summary_title')}
      </div>
      <div className="summary-counter">
        {counterValue.map((el: any, i: number, arr: any[]) => el.type === 'counter' ? (
          <div key={el.title + el.value + i}>
            {t(el.title)}<b>{el.value}{el.param ? <>{t('m')}<sup>2</sup></> : ''}</b>
            <b>{i + 1 === arr.length ? '' : ';'}</b>
          </div>
        ) : (
          <div key={el.title + el.value + i}>
            {t(el.value)}
          </div>
        ))}
      </div>
      {getSubServices(subServiceList).length ? (
        <div className="services-in-summary">
          <div className="title-sub-service-title">
            {t('Add services')}
          </div>
          {getSubServices(subServiceList).map((title: string, i: number) => (
            <div className="service-item _flex _items-center" key={title + i}>
              <div>{`${t(title)} (${subServiceList.filter((el: ISubService) => el.title === title).length})`}</div>
              <div className="icon-wrapper _cursor-pointer" onClick={() => onRemoveSubService(title, sec)}>
                <IconCrosse />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )

  return (
    <div className="summary-layout">
      <div className="summary-wrapper _flex _flex-col">
        {renderSummeryService({ serviceTitle: title, counterValue: counter, subServiceList: subService })}
        {secTitle !== '' ? (
          <>
            <div className='summary-wrapper-separator'/>
            {renderSummeryService({
              serviceTitle: secTitle,
              counterValue: secCounter,
              subServiceList: secSubService,
              sec: true
            })}
          </>
        ) : null}
        <div className="estimated-wrapper">
          {`${t('Estimated Duration of service:')} `}<b>{getEstimate()}</b>
        </div>
        <PromoInput setSale={setSale} t={t} />
        <div className="to-pay-wrapper _flex _items-baseline">
          <div className="title">{t('To pay:')}</div>
          {sale ? (
            <>
              <div className="current-price">{getNewPrice(160, sale)}{t('zl')}</div>
              <div className="old-price">160 zl</div>
            </>
          ) : (
            <div className="current-price">160 zl</div>
          )}
        </div>
      </div>
      <div className="order-wrapper _cursor-pointer" onClick={() => setOrder(true)}>
        {t('Order')}
      </div>
      {order ? (
        <UserData t={t}/>
      ) : null}
    </div>
  );
};