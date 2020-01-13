import {isOverdueDate, isOneDay} from '../utils/common';

const calculateOverdueTasksCount = (tasks) => {
  return tasks.filter((task) => isOverdueDate(task.dueDate)).length;
};

const calculateTodayTasksCount = (tasks) => {
  return tasks.filter((task) => isOneDay(task.dueDate)).length;
};

const calculateFavoritesTasksCount = (tasks) => {
  return tasks.filter((task) => task.isFavorite).length;
};

const calculateRepeatingDaysTasksCount = (tasks) => {
  return tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
};

const calculateTagsTasksCount = (tasks) => {
  return tasks.filter((task) => task.tags.size).length;
};

const calculateArchivesTasksCount = (tasks) => {
  return tasks.filter((task) => task.isArchive).length;
};

const generateFilter = (tasks) => {
  return (
    [
      {
        title: `all`,
        count: tasks.length
      },
      {
        title: `overdue`,
        count: calculateOverdueTasksCount(tasks)
      },
      {
        title: `today`,
        count: calculateTodayTasksCount(tasks)
      },
      {
        title: `favorites`,
        count: calculateFavoritesTasksCount(tasks)
      },
      {
        title: `repeating`,
        count: calculateRepeatingDaysTasksCount(tasks)
      },
      {
        title: `tags`,
        count: calculateTagsTasksCount(tasks)
      },
      {
        title: `archive`,
        count: calculateArchivesTasksCount(tasks)
      }
    ]
  );
};

export {generateFilter};
