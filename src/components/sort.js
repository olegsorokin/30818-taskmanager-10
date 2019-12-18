import AbstractComponent from './abstract-component';

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SortType.DEFAULT}"  class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SortType.DATE_UP}"  class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SortType.DATE_DOWN}"  class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (event) => {
      event.preventDefault();

      if (event.target.tagName !== `A`) {
        return;
      }

      const sortType = event.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
