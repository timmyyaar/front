import React from 'react';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';

export const DateAndTime = ({ time, setTime, data, setData, t, discounts }: any) => {
  return (
    <div className="flex flex-col">
      <DatePicker data={data} setData={setData} t={t} discounts={discounts}/>
      <TimePicker time={time} setTime={setTime} t={t} data={data}/>
    </div>
  )
};
