import React, { useState } from "react";

import { ArrowLeft } from "../../icons/ArrowLeft";
import { ArrowRight } from "../../icons/ArrowRight";

import "./style.scss";

const pages = {
  0: [0, 5],
  1: [6, 11],
  2: [12, 17],
  3: [18, 23],
};

const FROM_TIME_ENABLED = 7;
const TO_TIME_ENABLED = 21;
const IN_ADVANCED_TODAY_HOURS = 5;

const getIsTimeDisabled = (
  numericHour: number,
  numericMinutes: number,
  isTodaySelected: boolean
) => {
  const isOutOfWorkingHours =
    numericHour < FROM_TIME_ENABLED ||
    numericHour > TO_TIME_ENABLED ||
    (numericHour === TO_TIME_ENABLED && numericMinutes > 0);
  const today = new Date();
  const nowTimeAndAdvance =
    +`${today.getHours()}.${today.getMinutes()}` + IN_ADVANCED_TODAY_HOURS;
  const numericTime = +`${numericHour}.${numericMinutes}`;

  const isLessTimeThatNowToday =
    isTodaySelected && nowTimeAndAdvance >= numericTime;

  return isOutOfWorkingHours || isLessTimeThatNowToday;
};

export const TimePicker = ({ time, setTime, t, data }: any) => {
  const [timePage, setTimePage] = useState(1);
  const selectedDate = data ? data.split("/") : null;
  const selectedDateDay = data.split("/")[0] ? +selectedDate[0] : null;
  const isTodaySelected = new Date().getDate() === selectedDateDay;

  const generateTimeOptions = () => {
    const timeOptions = [];
    // @ts-ignore
    const startHour = pages[timePage][0];
    // @ts-ignore
    const endHour = pages[timePage][1];
    const intervalMinutes = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute === 0 ? "00" : `${minute}`;
        const timeItem = `${formattedHour}:${formattedMinute}`;
        const isTimeDisabled = getIsTimeDisabled(
          +formattedHour,
          +formattedMinute,
          isTodaySelected
        );

        timeOptions.push(
          <div
            className={`time-cell ${timeItem === time ? "time-selected" : ""} ${
              isTimeDisabled ? "time-disabled" : ""
            } _flex _items-center _justify-center _cursor-pointer`}
            onClick={() => setTime(timeItem)}
            key={timeItem}
          >
            {timeItem}
          </div>
        );
      }
    }

    return timeOptions;
  };

  const prevPage = () => {
    setTimePage((prevPage) => (prevPage !== 0 ? prevPage - 1 : 3));
  };

  const nextPage = () => {
    setTimePage((prevPage) => (prevPage !== 3 ? prevPage + 1 : 0));
  };

  return (
    <div className="_p-2">
      <div className="_flex _items-center _justify-between _mb-5">
        <div className="_text-xl _font-bold">{t("Time")}</div>
        <div className="button-date-picker-wrapper _flex _justify-between">
          <button
            className="button-date-picker _flex _items-center _justify-center"
            onClick={prevPage}
          >
            <ArrowLeft />
          </button>
          <button
            className="button-date-picker _flex _items-center _justify-center"
            onClick={nextPage}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="_grid _grid-cols-4">{generateTimeOptions()}</div>
    </div>
  );
};
