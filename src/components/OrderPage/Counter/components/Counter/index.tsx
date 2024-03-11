import React, { FC } from 'react';

import './style.scss';

interface IProps {
  value: number;
  minValue: number;
  title: string;
  onChange: (n: number) => void;
  onMinus: () => void;
  onPlus: () => void;
  t: any;
}

export const Counter: FC<IProps> = (props) => {
  const { value, title = '', minValue, onChange, onMinus, onPlus, t } = props;
  const limit = value === minValue;

  // @ts-ignore
  const enterNumbers = (e) => {
    onChange(e.target.value);
  }

  return (
    <div className="counter-component">
      <div className={`counter-icons icon-minus ${limit ? 'icon-limit' : '' }`} onClick={limit ? () => {} : onMinus}>
        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF"/>
          <path d="M31.167 40L49.8337 40" stroke="#232323" strokeWidth="5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="counter-title">
        <input
          type="text" style={{ textAlign: 'end', backgroundColor: '#ECF0FF', outline: 'none', width: '10%', marginRight: '2px' }}
          value={value} onChange={enterNumbers}
        />
        {title.indexOf('m2') !== -1
          ? <>{title.replace('m2', '')}<>m<sup>2</sup></></>
          : t(title)
        }
      </div>
      <div className="counter-icons icon-plus" onClick={onPlus}>
        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF"/>
          <path d="M40.5 30.6689V49.3356" stroke="#232323" strokeWidth="5" strokeLinecap="round"/>
          <path d="M31.1689 40L49.8356 40" stroke="#232323" strokeWidth="5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};
