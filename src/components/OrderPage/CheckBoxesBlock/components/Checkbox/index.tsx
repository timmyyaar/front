import React, { FC } from 'react';
import Image from 'next/image';

import checkSvg from './icons/mingcute_check-fill.svg';
import './style.scss';

export const CheckBox: FC<any> = ({ icon, title, subTitle, price, oldPrice, checked, setCheck, t }) => {
  return (
    <div className="check-boxes-component">
      <div className="check-box-wrapper" onClick={() => setCheck((ch: boolean) => !ch)}>
        <div className="checked-icon-wrapper">
          {checked ? (
            <div className="checked-icon">
              <Image src={checkSvg} alt="" />
            </div>
          ) : null}
        </div>
        <div className="content-wrapper-checkbox">
          <div className="image-wrapper">
            <Image src={icon} alt="" />
          </div>
          <div className="text-wrapper">
            <div className="title">
              {t(title)}
            </div>
            {subTitle ? (
              <div className="sub-title">
                {t(subTitle)}
              </div>
            ) : null}
          </div>
        </div>
        <div className="price-wrapper">
          <div>
            {t(price)}
          </div>
          {oldPrice ? (
            <div className="olr-price-wrapper">
              {t(oldPrice)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};