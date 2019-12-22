import {colors} from '../const';
import {formatDate, formatTime, isOverdue} from '../utils/date-time';
import AbstractComponent from './abstract-component';

const createHashtagsMarkup = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return (
        `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${hashtag}"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${hashtag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`
      );
    })
    .join(`\n`);
};

const createRepeatingDaysMarkup = (repeatingDays, taskIndex = 1) => {
  return Object
    .entries(repeatingDays)
    .map(([key, value]) => {
      const isChecked = value ? `checked` : ``;

      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${key}-${taskIndex}"
          name="repeat"
          value="${key}"
          ${isChecked}
        />
        <label class="card__repeat-day" for="repeat-${key}-${taskIndex}"
          >${key}</label
        >`
      );
    })
    .join(`\n`);
};

const createColorsMarkup = (currentColor, taskIndex) => {
  return colors
    .map((color) => {
      const isChecked = currentColor === color ? `checked` : ``;

      return (
        `<input
          type="radio"
          id="color-${color}-${taskIndex}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${isChecked}
        />
        <label
          for="color-${color}-${taskIndex}"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(`\n`);
};

const createTaskEditTemplate = ({description, dueDate, repeatingDays, tags, color}, taskIndex) => {
  const hasDueDate = Boolean(dueDate);

  const hasRepeatingDays = Boolean(Object.values(repeatingDays).some(Boolean));
  const repeatingDaysClass = hasRepeatingDays ? `card--repeat` : ``;
  const repeatingDaysText = hasRepeatingDays ? `YES` : `NO`;
  const deadlineClass = isOverdue(dueDate) ? `card--deadline` : ``;
  const dueDateText = hasDueDate ? `YES` : `NO`;
  const dueDateMarkup = hasDueDate ? `${formatDate(dueDate)} ${formatTime(dueDate)}` : ``;

  return (
    `<article class="card card--edit card--${color} ${repeatingDaysClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${dueDateText}</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${dueDateMarkup}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${repeatingDaysText}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">${createRepeatingDaysMarkup(repeatingDays, taskIndex)}</div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">${createHashtagsMarkup([...tags])}</div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">${createColorsMarkup(color, taskIndex)}</div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractComponent {
  constructor(task, taskIndex) {
    super();
    this._taskIndex = taskIndex;
    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task, this._taskIndex);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}
