import { handleIndex } from "./handleIndex";

const arr = ["review1", "review2", "review3"];

test("It must return the last index of all the elements of an array if the value is less than 0.", () => {
  const value = -1;

  const index = handleIndex(value, arr.length);

  expect(index).toBe(arr.length - 1);
});

test("It must return 0 if the value is greater than all the elements of an array.", () => {
  const value = 4;

  const index = handleIndex(value, arr.length);

  expect(index).toBe(0);
});

test("It must return the same index that was entered, if it is neither less than 0 nor greater than the total number of elements in the array.", () => {
  const value = 2;

  const index = handleIndex(value, arr.length);

  expect(index).toBe(value);
});
