import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import SortComponent from './components/sort';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import LoadMoreButtonComponent from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const renderTask = (task, index) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task, index);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, () => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(tasks).getElement(), RenderPosition.BEFOREEND);
render(pageMain, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

const pageBoard = document.querySelector(`.board`);
const taskListElement = document.querySelector(`.board__tasks`);

render(pageBoard, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

let showingTaskCount = TASKS_PER_PAGE;
tasks.slice(0, showingTaskCount)
  .forEach((task, index) => {
    renderTask(task, index);
  });

if (TASK_COUNT >= TASKS_PER_PAGE) {
  render(pageBoard, new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTaskCount)
      .forEach((task, index) => {
        renderTask(task, index);
      });

    if (showingTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
