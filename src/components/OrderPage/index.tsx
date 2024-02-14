"use client";
import React, { useEffect, useState } from 'react';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';
import { MainImage } from '@/components/common/MainImage';
import { LeftArrow } from '@/components/common/Slider/icons/LeftArrow';

import { AddedMainService, getAdditionalServices } from './AddedMainService';
import { CheckBoxesBlock } from './CheckBoxesBlock';
import { CounterComponent } from './Counter';
import { DateAndTime } from './Summary/UserData/components/DateAndTime';
import { OrderForm } from './OrderForm';
import { ServicesList } from './ServicesList';
import { SubServicesList } from './SubServicesList';
import { Summary } from './Summary';
import { UserData } from './Summary/UserData';
import './style.scss';

export const OrderPage = (props: any) => {
  const { locales } = props;
  const { t } = useLocales(locales);
  const services = ['General cleaning', 'Healthcare', 'Special cleaning'];
  const [selectedCategory, setCategory] = useState<typeof services[number] | ''>('General cleaning');
  // main service
  const [selectedService, setService] = useState<string>('');
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState([]);
  // second service
  const [selectedSecondService, setSecondService] = useState<string>('');
  const [secondCounterValue, setSecondCounterValue] = useState([]);
  const [secondSelectedSubService, setSecondSubService] = useState([]);

  useEffect(() => {
    setSubService([]);
    setSecondSubService([]);
  }, [selectedService]);

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
              <AddedMainService
                mainService={selectedService}
                setSecondService={setSecondService}
                t={t}
              >
                {getAdditionalServices(selectedService).length ? (
                  <>
                    {getAdditionalServices(selectedService) === 'ADD OZONATION SERVICE' ? (
                      <CounterComponent mainService={'Ozonation'} setCounterValue={setSecondCounterValue} t={t} />
                    ) : (
                      <div className="_flex _flex-col _gap-6">
                        <CounterComponent mainService={'Dry cleaning'} setCounterValue={setSecondCounterValue} t={t} />
                        <SubServicesList
                          mainService={'Dry cleaning'}
                          subServices={secondSelectedSubService}
                          setSubService={setSecondSubService}
                          t={t}
                        />
                      </div>
                    )}
                  </>
                ) : null}
              </AddedMainService>
              <CheckBoxesBlock
                mainService={selectedService}
                subServices={selectedSubService}
                setSubService={setSubService}
                t={t}
              />
            </div>
            <div className="right-col">
              <Summary
                title={selectedService}
                counter={counterValue}
                subService={selectedSubService}
                setSubService={setSubService}
                secTitle={selectedSecondService}
                secCounter={secondCounterValue}
                secSubService={secondSelectedSubService}
                setSecSubService={setSecondSubService}
                t={t}
              />
            </div>
          </div>
        </div>
      )}
      <Footer t={t} />
    </div>
  );
};
