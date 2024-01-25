import React, { FC, useState } from 'react';
import Image from 'next/image';

import Airbnb from '@/components/MainPage/AllServices/icons/airbnb.svg';
import Brush from '@/components/MainPage/AllServices/icons/brush.svg';
import BurningTime from '@/components/MainPage/AllServices/icons/burning-time.svg';
import Confetti from '@/components/MainPage/AllServices/icons/confetti.svg';
import Clean from '@/components/MainPage/AllServices/icons/clean.svg';
import Cleaning from '@/components/MainPage/AllServices/icons/cleaning.svg';
import Ecology from '@/components/MainPage/AllServices/icons/ecology.svg'
import Kitchen from '@/components/MainPage/AllServices/icons/kitchen.svg';
import List from '@/components/MainPage/AllServices/icons/list.svg';
import Mask from '@/components/MainPage/AllServices/icons/mask.svg';
import Office from '@/components/MainPage/AllServices/icons/office.svg';
import OzoneLayer from '@/components/MainPage/AllServices/icons/ozone-layer.svg';
import Sofa from '@/components/MainPage/AllServices/icons/sofa.svg';
import WeMoveToNewHouse from '@/components/MainPage/AllServices/icons/we-move-to-new-house.svg';
import Window from '@/components/MainPage/AllServices/icons/window.svg';
import { Modals } from '@/components/MainPage/AllServices/Modals';

import { Overlay } from '@/components/common/Overlay';
import howItWorksSvg from '@/components/common/icons/howItWorks.svg';
import { useClickOutside } from '@/hooks/useClickOutSide';

import './style.scss';

interface IProps {
  mainCategory: string;
  t: any;
  setService: (val: string) => void;
}

interface IService {
  [key: string]: { title: string, icon: any }[];
}

export const ServicesList: FC<IProps> = (props) => {
  const { mainCategory, t, setService } = props;
  const services: IService = {
    'General cleaning': [
      { title: 'Regular', icon: Cleaning },
      { title: 'Deep', icon: Clean },
      { title: 'Eco cleaning', icon: Ecology },
      { title: 'Custom cleaning', icon: List },
      { title: 'Office', icon: Office },
      { title: 'Post-construction', icon: Brush },
    ],
    Healthcare: [
      { title: 'Dry cleaning', icon: Sofa },
      { title: 'Ozonation', icon: OzoneLayer },
      { title: 'While sickness', icon: Mask },
    ],
    'Special cleaning': [
      { title: 'Window cleaning', icon: Window },
      { title: 'Move in/out', icon: WeMoveToNewHouse },
      { title: 'Deep kitchen', icon: Kitchen },
      { title: 'After party', icon: Confetti },
      { title: 'Airbnb', icon: Airbnb },
      { title: 'In a last minute', icon: BurningTime },
    ],
  };
  const [selectedService, setSelectedService] = useState('');
  const [serviceModal, setServiceModal] = useState('');
  const ref = useClickOutside(() => setServiceModal(''));

  const onSelectService = (service: string) => {
    setSelectedService(service);
    setService(service);
  }

  return (
    <div className="services-list-component">
      <Overlay active={!!serviceModal}>
        <div ref={ref}>
          <Modals title={serviceModal} onClose={() => setServiceModal('')} t={t} />
        </div>
      </Overlay>
      <div className="_grid _grid-cols-3">
        {services[mainCategory].map((el, i) => (
          <div
            className={`service-wrapper ${el.title === selectedService ? 'active-wrapper' : ''}`}
            onClick={() => onSelectService(el.title)}
            key={el.title + i}
          >
            <div className="item-title">
              {t(el.title)}
            </div>
            <div className="_flex _justify-center" style={{ userSelect: 'none' }}>
              <Image src={el.icon} alt='' />
            </div>
            <div className="how-to-work _flex _justify-center">
              <div className="_flex _gap-2" onClick={() => setServiceModal(el.title)}>
                <div>{t('How it works')}</div>
                <div className="_py-1 _cursor-pointer">
                  <Image src={howItWorksSvg} alt='' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};