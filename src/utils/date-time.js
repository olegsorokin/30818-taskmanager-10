const formatDate = (date) => {
  const targetDate = new Date(date);

  return `${targetDate.getDate()} ${targetDate.toLocaleString(`en-US`, {month: `long`})}`;
};

const formatTime = (date) => {
  const targetDate = new Date(date);

  return targetDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`});
};

export {formatDate, formatTime};
