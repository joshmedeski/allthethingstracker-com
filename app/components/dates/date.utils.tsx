import {
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getFirstDayOfMonthGridOffsetClass = (date: Date) => {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  if (isSunday(firstDayOfMonth)) return "";
  if (isMonday(firstDayOfMonth)) return "col-start-2";
  if (isTuesday(firstDayOfMonth)) return "col-start-3";
  if (isWednesday(firstDayOfMonth)) return "col-start-4";
  if (isThursday(firstDayOfMonth)) return "col-start-5";
  if (isFriday(firstDayOfMonth)) return "col-start-6";
  if (isSaturday(firstDayOfMonth)) return "col-start-7";
};

export const getQuarter = (date: Date) => {
  // get the months in the date's quarter
  // get the first month in the quarter
  // get the last month in the quarter
};
