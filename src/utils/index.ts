import { Prices } from "@/types";

export const getOzonationMultiplier = (prices: Prices, value: number) =>
  value > 120
    ? prices.ozonationBigArea
    : value > 50
    ? prices.ozonationMediumArea
    : prices.ozonationSmallArea;

export const getDateString = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const twoDigitsMonth = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();

  return `${day}/${twoDigitsMonth}/${year}`;
};

export const getDateTimeString = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const twoDigitsMonth = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();
  const hours = date.getHours();
  const twoDigitsHours = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getMinutes();
  const twoDigitsMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day}/${twoDigitsMonth}/${year} ${twoDigitsHours}:${twoDigitsMinutes}`;
};

export const getDateObjectFromString = (string: string) => {
  const dateArray = string.split("/");

  const day = +dateArray[0];
  const month = +dateArray[1];
  const year = +dateArray[2];

  return new Date(year, month - 1, day);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getOneDigitFloat = (number: number) =>
  Number(parseFloat(number.toFixed(1)));
