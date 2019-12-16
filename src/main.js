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
import {render, remove, replace, RenderPosition} from './utils/render';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

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

const renderBoard = (boardComponent, taskList) => {
  const isAllTasksArchived = taskList.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent, new NoTaskComponent(), RenderPosition.BEFOREEND);

    return;
  }

  render(boardComponent, new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent, new TasksComponent(), RenderPosition.BEFOREEND);

  const taskListElement = document.querySelector(`.board__tasks`);

  let showingTaskCount = TASKS_PER_PAGE;

  taskList.slice(0, showingTaskCount)
    .forEach((task, index) => {
      renderTask(taskListElement, task, index);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

  loadMoreButtonComponent.setClickHandler(() => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    taskList.slice(prevTasksCount, showingTaskCount)
      .forEach((task, index) => renderTask(taskListElement, task, index));

    if (showingTaskCount >= taskList.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(tasks), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(pageMain, boardComponent, RenderPosition.BEFOREEND);

renderBoard(boardComponent.getElement(), tasks);
