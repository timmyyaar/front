import React, { FC, useState, useEffect, useRef } from 'react';

import { ISubService } from '../SubServicesList/utils';
import { IconCrosse } from './icons/IconCrosse';
import { PromoInput } from './PromoCodeInput';
import { UserData } from './UserData';
import {
  getEstimateFromCounterByService,
  getPriceFromCounterByService,
} from './utils';
import './style.scss';

interface IProps {
  title: string;
  counter: { title: string; value: string; type?: string; param?: string }[];
  subService: ISubService[];
  setSubService: (service: any) => void;
  secTitle?: string;
  secCounter?: { title: string; value: string; type?: string; param?: string }[];
  secSubService?: ISubService[];
  setSecSubService?: (service: any) => void;
  subSale?: string;
  t: any;
}

function ScrollDetector() {
  const [scrolledToElement, setScrolledToElement] = useState(false);
  const targetElementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (targetElementRef.current) {
        // @ts-ignore
        const targetElementPosition = targetElementRef.current.getBoundingClientRect().top;
        if (targetElementPosition <= window.innerHeight) {
          setScrolledToElement(true);
        } else {
          setScrolledToElement(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetElementRef]);

  return [scrolledToElement, targetElementRef];
}

export const Summary: FC<IProps> = (props: any) => {
  const {
    title, counter, subService, setSubService,
    secTitle = '', secCounter = {}, secSubService = [], setSecSubService = () => {},
    subSale = '',
    t,
  } = props;
  const [sale, setSale] = useState(0);
  const [promo, setPromo] = useState('');
  const [order, setOrder] = useState(false);
  const [scrolledToElement, targetElementRef] = ScrollDetector();
  const [totalAddress, setTotalAddress] = useState('');
  const [totalDate, setTotalDate] = useState('');
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [request, setRequest] = useState(false);

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

  const makeSaleFromSub = (number: number, percentageString: string) => {
    const match = percentageString.match(/^(-?\d*\.?\d+)\s*%$/);
  
    if (match) {
      const percentage = parseFloat(match[1]);

      if (!isNaN(percentage)) {
        const result = number + (number * percentage / 100);
        return result;
      }
    }

    return number;
  }

  const getSubServices = (data: ISubService[]) => {
    const result: string[] = [];

    data.forEach((el: any) => {
      if (!result.includes(el.title)) result.push(el.title);
    });

    return result;
  };

  const getEstimate = () => {
    const countEstimate = getEstimateFromCounterByService(title, counter);
    const secCountEstimate = getEstimateFromCounterByService(secTitle, secCounter);
    const subServiceEstimate = subService.reduce((acc: number, el: ISubService) => acc += el?.time, 0);
    const secSubServiceEstimate = secSubService.reduce((acc: number, el: ISubService) => acc += el?.time, 0);

    let total =
      countEstimate + secCountEstimate +
      subServiceEstimate + secSubServiceEstimate;

    if (total > 480) {
      total = total / 2;
    }

    return `${Math.floor(total / 60)}h, ${total % 60}m`;
  };

  const getPrice = () => {
    const countEstimate = getPriceFromCounterByService(title, counter);
    const secCountEstimate = getPriceFromCounterByService(secTitle, secCounter);
    const subServiceEstimate = subService.reduce((acc: number, el: ISubService) => acc += el?.price, 0);
    const secSubServiceEstimate = secSubService.reduce((acc: number, el: ISubService) => acc += el?.price, 0);

    return countEstimate + secCountEstimate + subServiceEstimate + secSubServiceEstimate;
  };

  const getNewPrice = (originalPrice: number, discountPercentage: number) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;

    return discountedPrice.toFixed(2);
  }

  const handleScroll = () => {
    const targetElement = document.getElementById('order-btn');

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const sendData =  async () => {
    const main = {
      price: subSale ? getNewPrice(getPrice(), sale) : getPrice(),
      promo,
      address: totalAddress,
      date: totalDate,
      requestPreviousCleaner: request,
      onlinePayment: onlinePayment,
      estimate: getEstimate(),
    };
    const mainService = {
      title,
      counter: counter.map((el: any) => el.title ? t(el.title) + '(' + el.value + ')' : t(el.value)).join(' '),
      subService: getSubServices(subService).map((title: string) => 
        `${t(title + '_summery')} (${subService.filter((el: ISubService) => el.title === title).length})`
      ).join(' '),
    };
    const secService = secTitle ? {
      secTitle,
      secCounter: secCounter.map((el: any) => el.title ? t(el.title) + '(' + el.value + ')' : t(el.value)).join(' '),
      secSubService: getSubServices(secSubService).map((title: string) => 
        `${t(title + '_summery')} (${secSubService.filter((el: ISubService) => el.title === title).length})`
      ).join(' '),
    } : {};

    console.log({
      ...main,
      ...mainService,
      ...secService,
    });

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ ...main, ...mainService, ...secService, }),
    });
    const data = await response.json();
    console.log('DONE');

    if (data) {
      console.log(data);
    }
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
              <div>{`${t(title + '_summery')} (${subServiceList.filter((el: ISubService) => el.title === title).length})`}</div>
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
    <>
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
        {!subSale ? (<PromoInput setSale={setSale} setPromo={setPromo} t={t} />): null}
        {/* @ts-ignore */}
        <div className="to-pay-wrapper _flex _items-baseline" ref={targetElementRef}>
          <div className="title">{t('To pay:')}</div>
          {!subSale ? (
            sale ? (
              <>
                <div className="current-price">
                  {getNewPrice(getPrice(), sale)}{t('zl')}
                </div>
                <div className="old-price">{getPrice()}{t('zl')}</div>
              </>
            ) : (
              <div className="current-price">{getPrice()}{t('zl')}</div>
            )
          ) : (
            <>
              <div className="current-price">
                {makeSaleFromSub(getPrice(), subSale)}{t('zl')}
              </div>
              <div className="old-price">{getPrice()}{t('zl')}</div>
            </>
          )}
        </div>
      </div>
      <div id="order-btn">
        {!order ? (
          <div className="order-wrapper _cursor-pointer" onClick={() => setOrder(true)}>
            {t('Order')}
          </div>
        ) : (
          <>
            <UserData
              setTotalAddress={setTotalAddress}
              setTotalDate={setTotalDate}
              setOnlinePayment={setOnlinePayment}
              setRequest={setRequest}
              t={t}
            />
            <div className="order-wrapper _cursor-pointer" style={{ marginTop: '24px' }} onClick={sendData}>
              {t('Order')}
            </div>
          </>
        )}
      </div>
    </div>
    {!scrolledToElement ? (
      <div
        className="order-wrapper-absolute _cursor-pointer mobile-only"
        onClick={handleScroll}
      >
        {getPrice() === 0 ? t('Order') : !subSale ? (
          sale ? (
            <>
              <div className="current-price">
                {getNewPrice(getPrice(), sale)}{t('zl')}
              </div>
              <div className="old-price">{getPrice()}{t('zl')}</div>
            </>
          ) : (
            <div className="current-price">{getPrice()}{t('zl')}</div>
          )
        ) : (
          <>
            <div className="current-price">
              {makeSaleFromSub(getPrice(), subSale)}{t('zl')}
            </div>
            <div className="old-price">{getPrice()}{t('zl')}</div>
          </>
        )}
      </div>
    ) : null}
    </>
  );
};