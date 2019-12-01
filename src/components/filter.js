import {generateFilters} from '../mock/filter';

const createFiltersList = (tasks) => {
  return (
    generateFilters(tasks)
      .map(({title, count}) => {
        return (
          `<input
            type="radio"
            id="filter__${title}"
            class="filter__input visually-hidden"
            name="filter"
            ${title === `all` ? `checked` : ``}
            ${count ? `` : `disabled`}
          />
          <label for="filter__${title}" class="filter__label">
            ${title} <span class="filter__${title}-count">${count}</span></label
          >`
        );
      })
      .join(``)
  );
};

const createFiltersTemplate = (tasks) => {
  return (
    `<section class="main__filter filter container">${createFiltersList(tasks)}</section>`
  );
};

export {createFiltersTemplate};
