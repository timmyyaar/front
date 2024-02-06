import React, { FC } from 'react';
import Image from 'next/image';

import OzonSvg from './icons/ozone-layer.svg';
import CleanSvg from './icons/rectangle.svg';
import { getAdditionalServices } from './utils';
import './style.scss';
interface IProps {
  mainService: string;
  setSecondService: (props: any) => void;
  t: any;
  children: any;
}

export { getAdditionalServices };

export const AddedMainService: FC<IProps> = (props) => {
  const { mainService, setSecondService, t, children } = props;
  const [addServiceList, setAddServiceList] = React.useState(false);
  const addService = getAdditionalServices(mainService);
  const isOzonation = addService === 'ADD OZONATION SERVICE';

  const onClickSecondService = () => {
    setAddServiceList((sL) => !sL);
    setSecondService(isOzonation ? 'Ozonation' : 'Dry cleaning');
  };

  return addService ? (
    <div className="added-main-service-component">
      <div className="switch-component" onClick={onClickSecondService}>
        <div className="image-wrapper">
          <Image src={isOzonation ? OzonSvg : CleanSvg} alt='' />
        </div>
        <div className={`title ${addServiceList ? 'title-active' : ''}`}>
          {t(addService)}
        </div>
        {isOzonation ? (
          <div className={`icon ${addServiceList ? 'flipped-icon' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
              <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
            </svg>
          </div>
        ) : (
          <div className={`icon ${addServiceList ? 'flipped-icon' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
              <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
            </svg>
          </div>
        )}
      </div>
      {addServiceList ? (
        <div className="add-service-list-wrapper">
          {children}
        </div>
      ) : null}
    </div>
  ) : null;
};
