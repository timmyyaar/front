import React, { useEffect, useState } from 'react';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import './style.scss';

export const DateAndTime = ({ setDataAndTime }: any) => {
  const [data, setData] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setDataAndTime(() => {
      if (data && time) return [data, time].join(' ');
      if (data && !time) return data;
      if (!data && time) return time;
      return '';
    });
  }, [time, data]);

  return (
    <div className="date-and-time-component">
      <DatePicker data={data} setData={setData} />
      <TimePicker time={time} setTime={setTime} />
    </div>
  )
};
