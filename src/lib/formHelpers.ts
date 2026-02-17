import type { Dayjs } from 'dayjs';

export const handleNumericValueChange = (
  value: string,
): string => {
  return value.replace(/[^0-9]/g, '');
};

export const disableFutureDates = (current: Dayjs): boolean => {
  return current && current.valueOf() > Date.now();
};
