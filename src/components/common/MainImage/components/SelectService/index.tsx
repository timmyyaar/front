import React, { FC } from 'react';
import Image from 'next/image';

import { Writer } from '@/components/common/Writer';

import broom from './icons/Broom.svg';
import shieldCheck from './icons/shield-check 1.svg';
import soap from './icons/Soap.svg';
import './style.scss';

interface IProps {
  t: any;
  services: string[];
  setService: (service: string) => void;
}
export const SelectService: FC<IProps> = (props) => {
  const { t, services, setService } = props;
  const iconsSrc = {
    'General cleaning': broom,
    Healthcare: shieldCheck,
    'Special cleaning': soap,
  };

  return (
    <div className="select-service-wrapper">
      <div className="_flex _justify-center _gap-6">
        {services.map((el, i) => (
          <div className="service-wrapper" onClick={() => setService(el)} key={el + i}>
            <div className="_flex _justify-center">
              {/* @ts-ignore */}
              <Image src={iconsSrc[el]} width={80} height={80} alt='' />
            </div>
            <div className="service-wrapper-title">
              <Writer text={t(el)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};