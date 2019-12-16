import {remove, render, RenderPosition, replace} from '../utils/render';
import TaskComponent from '../components/task';
import TaskEditComponent from '../components/task-edit';
import NoTasksComponent from '../components/no-tasks';
import SortComponent from '../components/sort';
import TasksComponent from '../components/tasks';
import LoadMoreButtonComponent from '../components/load-more-button';

const TASKS_PER_PAGE = 8;

const renderTask = (taskListElement, task, index) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(taskComponent, taskEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task, index);
  taskEditComponent.setSubmitHandler(() => {
    replace(taskComponent, taskEditComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTaskCount = TASKS_PER_PAGE;
    tasks.slice(0, showingTaskCount)
      .forEach((task, index) => {
        renderTask(taskListElement, task, index);
      });

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTaskCount;
      showingTaskCount += TASKS_PER_PAGE;

      tasks.slice(prevTasksCount, showingTaskCount)
        .forEach((task, index) => renderTask(taskListElement, task, index));

      if (showingTaskCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
