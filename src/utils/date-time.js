const currentDate = new Date();
const startOfCurrentDay = currentDate.setHours(0, 0, 0, 0);
const endOfCurrentDay = currentDate.setHours(23, 59, 59, 999);

const formatDate = (date) => {
  const targetDate = new Date(date);

  return `${targetDate.getDate()} ${targetDate.toLocaleString(`en-US`, {month: `long`})}`;
};

const formatTime = (date) => {
  const targetDate = new Date(date);

  return targetDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`});
};

const isOverdue = (date) => {
  return Boolean(date && date < startOfCurrentDay);
};

const isToday = (date) => {
  return Boolean(date && (date >= startOfCurrentDay && date <= endOfCurrentDay));
};

export {formatDate, formatTime, isOverdue, isToday};
