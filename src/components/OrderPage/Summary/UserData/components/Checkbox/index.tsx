import React, { FC } from 'react';
import Image from 'next/image';

import checkSvg from './icons/mingcute_check-fill.svg';
import './style.scss';

export const CheckBox: FC<any> = ({ title, checked, setCheck, t }) => {
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
          <div className="text-wrapper">
            <div className="_whitespace-pre-line">
              {t(title)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};