import React, { useEffect, useState } from "react";

import { ArrowLeft } from "../../icons/ArrowLeft";
import { ArrowRight } from "../../icons/ArrowRight";

import { getDateString } from "@/utils";

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
  const isTodaySelected = data === getDateString(new Date());

  useEffect(() => {
    if (time) {
      const splittedTime = time.split(":");

      const isTimeDisabled = getIsTimeDisabled(
        +splittedTime[0],
        +splittedTime[1],
        isTodaySelected
      );

      if (isTimeDisabled) {
        setTime("");
      }
    }
  }, [isTodaySelected]);

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
            className={`mb-3 h-10 transition-all font-semibold cursor-pointer
              rounded-full hover:text-white hover:bg-primary ${
                timeItem === time ? "text-white bg-primary" : ""
              } ${
              isTimeDisabled ? "pointer-events-none text-gray-lighter" : ""
            } flex items-center justify-center cursor-pointer`}
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
    <div className="p-2">
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl font-bold">{t("Time")}</div>
        <div className="w-24 flex justify-between">
          <button
            className={`w-7 h-7 rounded-md hover:text-primary transition-all
              bg-white shadow-md flex items-center justify-center`}
            onClick={prevPage}
          >
            <ArrowLeft />
          </button>
          <button
            className={`w-7 h-7 rounded-md hover:text-primary transition-all
              bg-white shadow-md flex items-center justify-center`}
            onClick={nextPage}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4">{generateTimeOptions()}</div>
    </div>
  );
};
