import {formatDate, formatTime} from '../utils/date-time';

export const createTaskTemplate = ({description, dueDate, tags, color}) => {
  const taskDate = formatDate(dueDate);
  const taskTime = formatTime(dueDate);

  const taskTagsTemplate = [...tags]
    .map((item) => {
      return (
        `<span class="card__hashtag-inner">
          <span class="card__hashtag-name">
            #${item}
          </span>
        </span>`
      );
    }).join(``);

  return (
    `<article class="card card--${color}">
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
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${taskDate}</span>
                    <span class="card__time">${taskTime}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">${taskTagsTemplate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};
