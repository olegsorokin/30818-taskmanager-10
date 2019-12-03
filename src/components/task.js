import {formatDate, formatTime, isOverdue} from '../utils/date-time';

const createHashtagsTemplate = (tags) => {
  if (!tags) {
    return ``;
  }

  const hashtags = [...tags]
    .map((item) => {
      return (
        `<span class="card__hashtag-inner">
          <span class="card__hashtag-name">
            #${item}
          </span>
        </span>`
      );
    }).join(`\n`);

  return (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${hashtags}
      </div>
    </div>`
  );
};

const createDueDateTemplate = (dueDate) => {
  if (!dueDate) {
    return ``;
  }

  const taskDate = formatDate(dueDate);
  const taskTime = formatTime(dueDate);

  return (
    `<div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">${taskDate}</span>
          <span class="card__time">${taskTime}</span>
        </p>
      </div>
    </div>`
  );
};

const createTaskTemplate = ({description, dueDate, repeatingDays, tags, color}) => {
  const hasDueDate = Boolean(dueDate);

  const hasRepeatingDaysClass = (hasDueDate && Object.values(repeatingDays).some(Boolean)) ? `card--repeat` : ``;
  const deadlineClass = isOverdue(dueDate) ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${hasRepeatingDaysClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${createDueDateTemplate(dueDate)}
              ${createHashtagsTemplate(tags)}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export {createTaskTemplate};
