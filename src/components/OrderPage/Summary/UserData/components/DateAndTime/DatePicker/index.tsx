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

    // Adjust for Monday-first week: Sunday (0) should have 6 empty cells, Monday (1) should have 0, etc.
    const emptyCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < emptyCells; i++) {
      calendar.push(
        <div
          className="w-10 h-10 cursor-pointer rounded-full hover:bg-primary hover:text-white text-gray-lighter pointer-events-none hover:bg-light hover:cursor-default hover:rounded-lg"
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
        ? "text-white bg-primary rounded-full"
        : "";
      const dayCellDiscountClassName = discount
        ? discount < 0
          ? `border border-solid border-warning hover:bg-warning ${
              isDaySelected ? "bg-warning" : ""
            }`
          : `border border-solid border-success hover:bg-success ${
              isDaySelected ? "bg-success" : ""
            }`
        : "";

      calendar.push(
        <div
          className="flex flex-col items-center justify-start h-16"
          key={day}
        >
          <div
            className={`w-10 h-10 transition-all hover:bg-primary min-h-10 font-semibold
              rounded-full hover:text-white ${dayCellClassName} ${dayCellDiscountClassName} ${
              checkDisableDay(currentDay)
                ? `text-gray-lighter pointer-events-none hover:bg-light
                   hover:rounded-lg hover:cursor-default`
                : ""
            } ${
              discount ? "" : "mb-3"
            } flex items-center justify-center cursor-pointer`}
            onClick={() => {
              if (!checkDisableDay(currentDay)) setData(currentDay);
            }}
          >
            {day}
          </div>
          {Boolean(discount) && (
            <div
              className={`font-sm mt-1 font-semibold ${
                discount < 0 ? "text-warning" : "text-success"
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
    <div className="p-2">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-bold">
          {t(months[currentMonth.getMonth()])}, {currentMonth.getFullYear()}
        </div>
        <div className="w-24 flex justify-between">
          <button
            className={`w-7 h-7 rounded-md hover:text-primary transition-all
             bg-white shadow-md flex items-center justify-center`}
            onClick={prevMonth}
          >
            <ArrowLeft />
          </button>
          <button
            className={`w-7 h-7 rounded-md hover:text-primary transition-all
             bg-white shadow-md flex items-center justify-center`}
            onClick={nextMonth}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="py-3 grid grid-cols-7">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="text-sm font-semibold flex justify-center"
          >
            {t(weekDay)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{generateCalendar()}</div>
    </div>
  );
};
