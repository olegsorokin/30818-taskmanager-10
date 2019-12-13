import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import SortComponent from './components/sort';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import TasksComponent from './components/tasks';
import NoTaskComponent from './components/no-tasks';
import LoadMoreButtonComponent from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const renderTask = (taskListElement, task, index) => {
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

const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(pageBoard, new NoTaskComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  render(pageBoard, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(pageBoard, new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = document.querySelector(`.board__tasks`);

  let showingTaskCount = TASKS_PER_PAGE;

  tasks.slice(0, showingTaskCount)
    .forEach((task, index) => {
      renderTask(taskListElement, task, index);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(pageBoard, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTaskCount)
      .forEach((task, index) => renderTask(taskListElement, task, index));

    if (showingTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
