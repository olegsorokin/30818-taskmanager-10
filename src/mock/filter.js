const calculateOverdueTasksCount = (tasks) => {
  const currentDate = new Date().getTime();

  return tasks.filter((task) => task.dueDate < currentDate).length;
};

const calculateTodayTasksCount = (tasks) => {
  const startOfCurrentDay = new Date().setHours(0, 0, 0, 0);
  const endOfCurrentDay = new Date().setHours(23, 59, 59, 999);

  return tasks.filter((task) => task.dueDate >= startOfCurrentDay && task.dueDate <= endOfCurrentDay).length;
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

const generateFilters = (tasks) => {
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

export {generateFilters};
