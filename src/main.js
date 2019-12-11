import SiteMenu from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenu().getElement(), `beforeend`);
render(pageMain, createFilterTemplate(tasks), `beforeend`);
render(pageMain, createBoardTemplate(), `beforeend`);

const pageBoard = document.querySelector(`.board`);
const pageTasks = document.querySelector(`.board__tasks`);

render(pageTasks, createTaskEditTemplate(tasks[0], 0), `beforeend`);

let showingTaskCount = TASKS_PER_PAGE;
tasks.slice(1, showingTaskCount).forEach((task) => render(pageTasks, createTaskTemplate(task), `beforeend`));

if (TASK_COUNT >= TASKS_PER_PAGE) {
  render(pageBoard, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTaskCount)
      .forEach((task) => render(pageTasks, createTaskTemplate(task), `beforeend`));

    if (showingTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
