import React, { useState } from "react";

import { ArrowLeft } from "../../icons/ArrowLeft";
import { ArrowRight } from "../../icons/ArrowRight";

import { Discount } from "@/components/OrderPage/Summary";
import { getDateObjectFromString, getDateString } from "@/utils";

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

export const DatePicker = ({ data, setData, t, discounts }: any) => {
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
    const d1 = new Date();

    const d2 = getDateObjectFromString(date);

    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return d1 > d2;
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const calendar = [];

    for (let i = 1; i < firstDayOfMonth; i++) {
      calendar.push(
        <div
          className="_w-10 _h-10 _cursor-pointer _rounded-full hover:_bg-primary hover:_text-white _text-gray-lighter _pointer-events-none hover:_bg-light hover:_cursor-default hover:_rounded-lg"
          key={`empty-${i}`}
        >
          {" "}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let currentDay = `${day}/${currentMonth.toLocaleString("en-US", {
        month: "2-digit",
      })}/${currentMonth.getFullYear()}`;

      const discount =
        currentDay === getDateString(new Date())
          ? -10
          : discounts.find(({ date }: Discount) => date === currentDay)?.value;
      const isDaySelected = currentDay === data;
      const dayCellClassName = isDaySelected
        ? "_text-white _bg-primary _rounded-full"
        : "";
      const dayCellDiscountClassName = discount
        ? discount < 0
          ? `_border _border-solid _border-warning hover:_bg-warning ${
              isDaySelected ? "_bg-warning" : ""
            }`
          : `_border _border-solid _border-success hover:_bg-success ${
              isDaySelected ? "_bg-success" : ""
            }`
        : "";

      calendar.push(
        <div className="_flex _flex-col _items-center _justify-start _h-16">
          <div
            className={`_w-10 _h-10 _transition-all hover:_bg-primary _min-h-10 _font-semibold
              _rounded-full hover:_text-white ${dayCellClassName} ${dayCellDiscountClassName} ${
              checkDisableDay(currentDay)
                ? `_text-gray-lighter _pointer-events-none hover:_bg-light
                   hover:_rounded-lg hover:_cursor-default`
                : ""
            } ${
              discount ? "" : "_mb-3"
            } _flex _items-center _justify-center _cursor-pointer`}
            onClick={() => {
              if (!checkDisableDay(currentDay)) setData(currentDay);
            }}
            key={day}
          >
            {day}
          </div>
          {Boolean(discount) && (
            <div
              className={`_font-sm _mt-1 _font-semibold ${
                discount < 0 ? "_text-warning" : "_text-success"
              }`}
            >
              {-discount}%
            </div>
          )}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="_p-2">
      <div className="_flex _items-center _justify-between _mb-3">
        <div className="_text-xl _font-bold">
          {t(months[currentMonth.getMonth()])}, {currentMonth.getFullYear()}
        </div>
        <div className="_w-24 _flex _justify-between">
          <button
            className={`_w-7 _h-7 _rounded-md hover:_text-primary _transition-all
             _bg-white _shadow-md _flex _items-center _justify-center`}
            onClick={prevMonth}
          >
            <ArrowLeft />
          </button>
          <button
            className={`_w-7 _h-7 _rounded-md hover:_text-primary _transition-all
             _bg-white _shadow-md _flex _items-center _justify-center`}
            onClick={nextMonth}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="_py-3 _grid _grid-cols-7">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="_text-sm _font-semibold _flex _justify-center"
          >
            {t(weekDay)}
          </div>
        ))}
      </div>
      <div className="_grid _grid-cols-7">{generateCalendar()}</div>
    </div>
  );
};
