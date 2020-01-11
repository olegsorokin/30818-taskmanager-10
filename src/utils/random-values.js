const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomInteger = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export {getRandomBoolean, getRandomInteger, getRandomArrayItem};
