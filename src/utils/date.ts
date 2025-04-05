import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);

// Format a date to a readable string
export const formatDate = (
  date: string | Date | Dayjs,
  format = 'DD MMM YYYY'
) => {
  return dayjs(date).format(format);
};

// Check if a date is today
export const isDateToday = (date: string | Date) => {
  return dayjs(date).isToday();
};

// Check if a date is yesterday
export const isDateYesterday = (date: string | Date) => {
  return dayjs(date).isYesterday();
};

// Get time from now (e.g., "3 hours ago")
export const fromNow = (date: string | Date) => {
  return dayjs(date).fromNow();
};

// Check if a date is before another
export const isBefore = (a: string | Date, b: string | Date) => {
  return dayjs(a).isBefore(dayjs(b));
};

// Check if a date is after another
export const isAfter = (a: string | Date, b: string | Date) => {
  return dayjs(a).isAfter(dayjs(b));
};

// Check if a date is same or before another
export const isSameOrBeforeDate = (a: string | Date, b: string | Date) => {
  return dayjs(a).isSameOrBefore(dayjs(b));
};

// Check if a date is same or after another
export const isSameOrAfterDate = (a: string | Date, b: string | Date) => {
  return dayjs(a).isSameOrAfter(dayjs(b));
};

// Add days to a date
export const addDays = (date: string | Date, amount: number) => {
  return dayjs(date).add(amount, 'day').toDate();
};

// Subtract days from a date
export const subtractDays = (date: string | Date, amount: number) => {
  return dayjs(date).subtract(amount, 'day').toDate();
};

// Get start of the day
export const startOfDay = (date: string | Date) => {
  return dayjs(date).startOf('day').toDate();
};

// Get end of the day
export const endOfDay = (date: string | Date) => {
  return dayjs(date).endOf('day').toDate();
};

// Compare if two dates are the same (optionally by unit)
export const isSameDate = (
  a: string | Date,
  b: string | Date,
  unit: dayjs.OpUnitType = 'day'
) => {
  return dayjs(a).isSame(dayjs(b), unit);
};

// Get current timestamp
export const now = () => {
  return dayjs().toDate();
};

// Parse custom format
export const parseDate = (dateStr: string, format: string) => {
  return dayjs(dateStr, format).toDate();
};

export const dateTimeFormat = 'YYYY-MM-DD hh:mm A';
