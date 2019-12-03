import {createMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTasks} from './mock/task';

const TASK_COUNT = 4;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, createMenuTemplate(), `beforeend`);
render(pageMain, createFilterTemplate(tasks), `beforeend`);
render(pageMain, createBoardTemplate(), `beforeend`);

const pageBoard = document.querySelector(`.board`);
const pageTasks = document.querySelector(`.board__tasks`);

render(pageTasks, createTaskEditTemplate(tasks[0], 0), `beforeend`);

tasks.slice(1, TASKS_PER_PAGE).forEach((task) => render(pageTasks, createTaskTemplate(task), `beforeend`));

render(pageBoard, createLoadMoreButtonTemplate(), `beforeend`);
