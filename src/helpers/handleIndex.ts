import { reviews } from "../constants/data";

export const handleIndex: (value: number) => number = (value) => {
  if (value < 0) return reviews.length - 1;
  if (value > reviews.length - 1) return 0;
  
  return value;
};