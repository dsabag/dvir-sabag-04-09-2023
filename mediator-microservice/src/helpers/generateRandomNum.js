export const generateRandomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
