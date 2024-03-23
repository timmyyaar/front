export const getOzonationMultiplier = (value: number) =>
  value > 120 ? 5 : value > 50 ? 6 : 7;
