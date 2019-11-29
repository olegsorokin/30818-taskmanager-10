import {getRandomBoolean, getRandomInteger, getRandomArrayItem} from '../utils/random-values';

const getDescription = () => {
  const DescriptionItems = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  return getRandomArrayItem(DescriptionItems);
};

const getDueDate = () => {
  const DAYS_COUNT = 7;
  const targetDate = new Date();
  const diffValue = getRandomInteger(DAYS_COUNT * -1, DAYS_COUNT);

  return targetDate.setDate(targetDate.getDate() + diffValue);
};

const getTags = () => {
  const TAGS_COUNT = 3;
  const Tags = [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ];

  return new Set(Tags
    .filter(() => getRandomBoolean())
    .slice(0, TAGS_COUNT));
};

const getColor = () => {
  const Colors = [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ];

  return getRandomArrayItem(Colors);
};

const generateTask = () => ({
  description: getDescription(),
  dueDate: getDueDate(),
  repeatingDays: {
    mo: getRandomBoolean(),
    tu: getRandomBoolean(),
    we: getRandomBoolean(),
    th: getRandomBoolean(),
    fr: getRandomBoolean(),
    sa: getRandomBoolean(),
    su: getRandomBoolean()
  },
  tags: getTags(),
  color: getColor(),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean()
});

const generateTasks = (count) => new Array(count)
  .fill(``)
  .map(() => generateTask());

export {generateTask, generateTasks};
