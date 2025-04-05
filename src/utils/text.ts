export const parseValidNumber = (
  value: string,
  previousValue: string
): string => {
  const number = Number(value);
  return isNaN(number) ? previousValue : number.toString();
};
