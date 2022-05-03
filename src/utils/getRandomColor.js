const colorsArray = [
  "#d7a206",
  "#8db600",
  "#8b008b",
  "#0070ff",
  "#ff55a3",
  "#e97451",
  "#03c03c",
  "#1e4d2b",
];

const getRandomColor = () => {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};

export { getRandomColor };
