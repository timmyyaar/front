"use client";
import React, { useState } from 'react';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';
import { MainImage } from '@/components/common/MainImage';
import { LeftArrow } from '@/components/common/Slider/icons/LeftArrow';

import { AddedMainService } from './AddedMainService';
import { CheckBoxesBlock } from './CheckBoxesBlock';
import { CounterComponent } from './Counter';
import { DateAndTime } from './DateAndTime';
import { OrderForm } from './OrderForm';
import { ServicesList } from './ServicesList';
import { SubServicesList } from './SubServicesList';
import { Summary } from './Summary';
import { UserData } from './UserData';
import './style.scss';

export const OrderPage = (props: any) => {
  const { locales } = props;
  const { t } = useLocales(locales);
  const services = ['General cleaning', 'Healthcare', 'Special cleaning'];
  const [selectedCategory, setCategory] = useState<typeof services[number] | ''>('General cleaning');
  const [selectedService, setService] = useState<string>('');
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState([]);

  return (
    <div className="order-page">
      {!selectedCategory ? (
        <MainImage services={services} setService={setCategory} t={t} />
      ) : (
        <div>
          <div className="header-wrapper _flex _items-center">
            <div className="_cursor-pointer _flex _items-center" onClick={() => setCategory('')}>
              <div className="arrow-button">
                <LeftArrow />
              </div>
              {t('General cleaning')}
            </div>
          </div>
          <div className="content-wrapper">
            <div className="left-col">
              <ServicesList mainCategory={selectedCategory} t={t} setService={setService} />
              <CounterComponent mainService={selectedService} setCounterValue={setCounterValue} t={t} />
              <SubServicesList mainService={selectedService} subServices={selectedSubService} setSubService={setSubService} t={t} />
              <AddedMainService mainService={selectedService} t={t}/>
              <CheckBoxesBlock mainService={selectedService} t={t} />
            </div>
            <div className="right-col">
              <Summary
                title={selectedCategory}
                counter={counterValue}
                subService={selectedSubService}
                setSubService={setSubService}
                t={t}
              />
            </div>
          </div>
          <OrderForm />
          <DateAndTime />
          <UserData />
        </div>
      )}
      <Footer t={t} />
    </div>
  );
};
