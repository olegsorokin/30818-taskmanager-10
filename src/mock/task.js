import {taskDescriptions, DAYS, COLORS, tags} from '../const';
import {getRandomBoolean, getRandomInteger, getRandomArrayItem} from '../utils/random-values';

const getDescription = () => {
  return getRandomArrayItem(taskDescriptions);
};

const getRandomDueDate = () => {
  const DAYS_COUNT = 7;
  const targetDate = new Date();
  const diffValue = getRandomInteger(-DAYS_COUNT, DAYS_COUNT);

  return targetDate.setDate(targetDate.getDate() + diffValue);
};

const getDueDate = () => {
  return getRandomBoolean() ? getRandomDueDate() : null;
};

const getRepeatingDays = (dueDate) => {
  const isDataShowing = Boolean(dueDate);
  const repeatingDays = {};

  DAYS.forEach((day) => {
    repeatingDays[day] = isDataShowing ? false : getRandomBoolean();
  });

  return repeatingDays;
};

const getTags = () => {
  const TAGS_COUNT = 3;

  return new Set(tags
    .filter(() => getRandomBoolean())
    .slice(0, TAGS_COUNT));
};

const getColor = () => {
  return getRandomArrayItem(COLORS);
};

const generateTask = () => {
  const dueDate = getDueDate();

  return (
    {
      id: String(new Date() + Math.random()),
      description: getDescription(),
      dueDate,
      repeatingDays: getRepeatingDays(dueDate),
      tags: getTags(),
      color: getColor(),
      isFavorite: getRandomBoolean(),
      isArchive: getRandomBoolean()
    }
  );
};

const generateTasks = (count) => new Array(count)
  .fill(``)
  .map(() => generateTask());

export {generateTask, generateTasks};
