import React, { useEffect, useState } from 'react';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import './style.scss';

export const DateAndTime = ({ dataAndTime, setDataAndTime }: any) => {
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

  useEffect(() => {
    const time = dataAndTime.split(' ');
    if (time[0]) setData(time[0]);
    if (time[1]) setTime(time[1]);
  }, [dataAndTime]);

  return (
    <div className="date-and-time-component">
      <DatePicker data={data} setData={setData} />
      <TimePicker time={time} setTime={setTime} />
    </div>
  )
};
