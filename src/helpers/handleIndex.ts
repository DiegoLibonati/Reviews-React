export const handleIndex = (value: number, arrLength: number): number => {
  if (value < 0) return arrLength - 1;
  if (value > arrLength - 1) return 0;

  return value;
};
