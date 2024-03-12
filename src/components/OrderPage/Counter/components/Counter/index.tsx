import React, { FC } from 'react';
import Cookies from 'js-cookie';

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

  const countTitle = () => {
    console.log(Cookies.get('locale'));
    if (Cookies.get('locale') === 'ru') {
      if (title === 'bedroom') {
        if (value === 1) return 'комната';
        if (value < 5) return 'комнаты';
        return 'комнат';
      }

      if (title === 'bathroom') {
        if (value === 1) return 'ванная комната';
        if (value < 5) return 'ванные комнаты';
        return 'ванных комнат';
      }

      if (title === 'windows') {
        if (value === 1) return 'окно';
        if (value > 1 && value < 5) return 'окна';
        return 'окон';
      }
    }
    if (Cookies.get('locale') === 'pl') {
      if (title === 'bedroom') {
        if (value === 1) return 'pokój';
        if (value < 5) return 'pokoje';
        return 'pokoi';
      }

      if (title === 'bathroom') {
        if (value === 1) return 'łazienka';
        if (value < 5) return 'łazienki';
        return 'łazienek';
      }

      if (title === 'windows') {
        return 'okien';
      }
    }
    if (Cookies.get('locale') === 'uk') {
      if (title === 'bedroom') {
        if (value === 1) return 'кімната';
        if (value < 5) return 'комнаты';
        return 'кімнат';
      }

      if (title === 'bathroom') {
        if (value === 1) return 'ванна кімната';
        if (value < 5) return 'ванні кімнати';
        return 'ванних кімнат';
      }

      if (title === 'windows') {
        if (value === 1) return 'вікно';
        if (value > 1 && value < 5) return 'вікна';
        return 'вікон';
      }
    }

    if (Cookies.get('locale') === 'en') {
      if (value > 1 && title !== 'windows') {
        return title + 's';
      }
    }

    return title;
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
          : countTitle()
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
