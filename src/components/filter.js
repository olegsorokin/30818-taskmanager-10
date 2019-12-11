import {generateFilter} from '../mock/filter';
import {createElement} from '../utils';

const createFilterMarkup = (tasks) => {
  return (
    generateFilter(tasks)
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
      .join(`\n`)
  );
};

const createFilterTemplate = (tasks) => {
  return (
    `<section class="main__filter filter container">${createFilterMarkup(tasks)}</section>`
  );
};

export default class Filter {
  constructor(tasks) {
    this._element = null;
    this._tasks = tasks;
  }

  getTemplate() {
    return createFilterTemplate(this._tasks);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
