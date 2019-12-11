import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import Board from './components/board';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadMoreButton from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenu().getElement(), `beforeend`);
render(pageMain, new Filter(tasks).getElement(), `beforeend`);
render(pageMain, new Board().getElement(), `beforeend`);

const pageBoard = document.querySelector(`.board`);
const pageTasks = document.querySelector(`.board__tasks`);

render(pageTasks, new TaskEdit(tasks[0], 0).getElement(), `beforeend`);

let showingTaskCount = TASKS_PER_PAGE;
tasks.slice(1, showingTaskCount).forEach((task) => render(pageTasks, new Task(task).getElement(), `beforeend`));

if (TASK_COUNT >= TASKS_PER_PAGE) {
  render(pageBoard, new LoadMoreButton().getElement(), `beforeend`);

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTaskCount)
      .forEach((task) => render(pageTasks, new Task(task).getElement(), `beforeend`));

    if (showingTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
