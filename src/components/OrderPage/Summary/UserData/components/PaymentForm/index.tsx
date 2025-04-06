import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import { Switcher } from '@/components/common/Switcher';

import creditCardPng from './icons/credit-card.png';
import cashPng from './icons/cash.png';

export const PaymentForm = ({ setOnlinePayment, t }: any) => {
  const tabs = ['Cash', 'Online'];
  const [tab, setTab] = useState(() => tabs[0]);

  useEffect(() => {
    setOnlinePayment(tab === 'Online');
  }, [tab]);

  return (
    <div>
      <Switcher
        icons={[
          <div className="flex justify-center">
            <Image src={cashPng} alt="" width="36" height="36"/>
          </div>,
          <div className="flex justify-center">
            <Image src={creditCardPng} alt="" width="36" height="36" />
          </div>
        ]}
        tab={tab} tabs={tabs} onClick={(el: string) => setTab(el)} t={t}
      />
    </div>
  )
};
