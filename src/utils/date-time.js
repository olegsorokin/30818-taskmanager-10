const formatDate = (date) => {
  const currentDate = new Date(date);

  return `${currentDate.getDate()} ${currentDate.toLocaleString(`en-US`, {month: `long`})}`;
};

const formatTime = (date) => {
  const currentDate = new Date(date);

  return currentDate.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`});
};

export {formatDate, formatTime};
