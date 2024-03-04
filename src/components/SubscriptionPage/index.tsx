"use client";
import React, { useState } from 'react';

import { Footer } from '@/components/Footer';
import { useLocales } from '@/hooks/useLocales';

import { sales } from '@/components/MainPage/Costs/constants';
import { CheckBoxesBlock } from '../OrderPage/CheckBoxesBlock';
import { CounterComponent } from '../OrderPage/Counter';
import { SubServicesList } from '../OrderPage/SubServicesList';
import { Summary } from '../OrderPage/Summary';
import './style.scss';

export const SubscriptionPage = (props: any) => {
  const { locales } = props;
  const { t } = useLocales(locales);

  const [sale, setSale] = useState(sales[0]);

  // main service
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState([]);

  return (
    <div className="subscription-page">
      <div className="content-wrapper">
        <div className="left-col">
          <div className='subscription_header-block'>
            <div className='subscription_header-title'>
              <div className='subscription_title'>{t('Subscription_title')}</div>
              <div className='subscription_sub_title'>{t('subscription_sub_title')}</div>
            </div>
            <div className='subscription_content'>
              {sales.map((item) => (
                <div
                  className={`subscription_item ${sale.sale === item.sale ? 'subscription_item_active' : ''}`}
                  onClick={() => setSale(item)}
                  key={JSON.stringify(item)}
                >
                  <div className='subscription_item_percent'>
                    {item.sale}
                  </div>
                  <div className='subscription_item_percent-wrapper'>
                    {t(item.title)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CounterComponent
            mainService={'Custom cleaning'}
            setCounterValue={setCounterValue}
            t={t}
          />
          <SubServicesList
            mainService={'Custom cleaning'}
            subServices={selectedSubService}
            setSubService={setSubService}
            t={t}
          />
          <CheckBoxesBlock
            mainService={'Custom cleaning'}
            subServices={selectedSubService}
            setSubService={setSubService}
            t={t}
          />
        </div>
        <div className="right-col">
          <Summary
            title={'Subscription'}
            counter={counterValue}
            subService={selectedSubService}
            setSubService={setSubService}
            subSale={sale.sale}
            t={t}
          />
        </div>
      </div>
      <Footer t={t} />
    </div>
  );
};
