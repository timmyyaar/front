import React, { FC } from 'react';

import './style.scss';

interface Props {
  icons?: any[]
  tab: string;
  tabs: string[];
  onClick: (el: string) => void;
  t?: any
}

export const Switcher: FC<Props> = ({ icons = [], tabs, tab, onClick, t = (str: string) => str }) => (
  <div className="costs-switcher _flex _justify-around">
    {tabs.map((el: string, i) => (
      <div className="costs-switcher-title _cursor-pointer" onClick={() => onClick(el)} key={el}>
        <span className={el === tab ? 'active' : ''}>
          <div className='_flex _items-center _gap-2'>
            {icons.length ? (<div>{icons[i]}</div>) : null}
            <b>{t(el)}</b>
          </div>
        </span>
      </div>
    ))}
    <div
      className="active-block"
      style={{ left: tabs.indexOf(tab) === 0 ? '-1px' : '50.5%' }}
    />
  </div>
);
