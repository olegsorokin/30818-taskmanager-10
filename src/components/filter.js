import {generateFilters} from '../mock/filter';
import AbstractComponent from './abstract-component';

const createFilterMarkup = (tasks) => {
  return (
    generateFilters(tasks)
      .map(({name, count}) => {
        return (
          `<input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${name === `all` ? `checked` : ``}
            ${count ? `` : `disabled`}
          />
          <label for="filter__${name}" class="filter__label">
            ${name} <span class="filter__${name}-count">${count}</span></label
          >`
        );
      })
      .join(`\n`)
  );
};

const createFilterTemplate = (tasks) => {
  return (
    `<section class="main__filter filter container">${createFilterMarkup(tasks)}</section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createFilterTemplate(this._tasks);
  }

  setFilterChangeHandler() {} // TODO: Add the logic
}
