import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import { Switcher } from '@/components/common/Switcher';

import back from './bank-card.svg';
import cash from './cash.svg';

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
          <div className="_flex _justify-center">
            <Image src={cash} alt="" />
          </div>,
          <div className="_flex _justify-center">
            <Image src={back} alt="" />
          </div>
        ]}
        tab={tab} tabs={tabs} onClick={(el: string) => setTab(el)} t={t}
      />
    </div>
  )
};
