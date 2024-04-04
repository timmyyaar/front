export const getOzonationMultiplier = (value: number) =>
  value > 120 ? 5 : value > 50 ? 6 : 7;

export const getDateString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const twoDigitsMonth = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  `${day}/${twoDigitsMonth}/${year} ${hours}:${minutes}`;
};
