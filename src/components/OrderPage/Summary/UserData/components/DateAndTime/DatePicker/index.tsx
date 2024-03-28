import React, { useState } from "react";

import { ArrowLeft } from "../../icons/ArrowLeft";
import { ArrowRight } from "../../icons/ArrowRight";

import "./style.scss";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DatePicker = ({ data, setData, t }: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(prevMonthDate);
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(nextMonthDate);
  };

  const checkDisableDay = (date: string) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const formattedMonth =
      currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const currentDate = `${today.getDate()}/${formattedMonth}/${today.getFullYear()}`;
    const parts1 = currentDate.split("/");
    const parts2 = date.split("/");
    const d1 = new Date(`${parts1[2]}-${parts1[1]}-${parts1[0]-1}`);
    const d2 = new Date(`${parts2[2]}-${parts2[1]}-${parts2[0]}`);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return d1 >= d2;
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const calendar = [];

    for (let i = 1; i < firstDayOfMonth; i++) {
      calendar.push(
        <div className="day-cell disable-day" key={`empty-${i}`}>
          {" "}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let currentDay = `${day}/${currentMonth.toLocaleString("en-US", {
        month: "2-digit",
      })}/${currentMonth.getFullYear()}`;
      calendar.push(
        <div
          className={`
						day-cell ${currentDay === data ? "selected-day" : ""} ${
            checkDisableDay(currentDay) ? "disable-day" : ""
          }
						_flex _items-center _justify-center _cursor-pointer
					`}
          onClick={() => {
            if (!checkDisableDay(currentDay)) setData(currentDay);
          }}
          key={day}
        >
          {day}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="date-picker-component _p-2">
      <div className="_flex _items-center _justify-between _mb-3">
        <div className="_text-xl _font-bold">
          {t(months[currentMonth.getMonth()])}, {currentMonth.getFullYear()}
        </div>
        <div className="button-date-picker-wrapper _flex _justify-between">
          <button
            className="button-date-picker _flex _items-center _justify-center"
            onClick={prevMonth}
          >
            <ArrowLeft />
          </button>
          <button
            className="button-date-picker _flex _items-center _justify-center"
            onClick={nextMonth}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="_py-2 _grid _grid-cols-7">
        {weekDays.map((weekDay) => (
          <div key={weekDay} className="week-day _flex _justify-center">
            {t(weekDay)}
          </div>
        ))}
      </div>
      <div className="_grid _grid-cols-7">{generateCalendar()}</div>
    </div>
  );
};
