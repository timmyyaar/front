import React from 'react';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import './style.scss';

export const DateAndTime = ({ time, setTime, data, setData, t, discounts }: any) => {
  return (
    <div className="date-and-time-component">
      <DatePicker data={data} setData={setData} t={t} discounts={discounts}/>
      <TimePicker time={time} setTime={setTime} t={t} data={data}/>
    </div>
  )
};
