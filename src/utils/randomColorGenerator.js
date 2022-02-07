const color = [
    "#f44336",
    "#f50057",
    "#4caf50",
    "#2196f3",
    "#b23c17",
    "#9c27b0",
    "#ff9800",
    "#651fff",
    "#ffeb3b",
    "#cddc39",
    "#00bcd4",
    "#009688",
  ];

export const getRandomColor = () => {
    return color[Math.floor(Math.random() * (color.length - 1) + 1)];
  };