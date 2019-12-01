import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTask, generateTasks} from './mock/task';

const TASK_COUNT = 3;
const tasks = generateTasks(TASK_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, createMenuTemplate(), `beforeend`);
render(pageMain, createFiltersTemplate(tasks), `beforeend`);
render(pageMain, createBoardTemplate(), `beforeend`);

const pageBoard = document.querySelector(`.board`);
const pageTasks = document.querySelector(`.board__tasks`);

render(pageTasks, createTaskEditTemplate(generateTask()), `beforeend`);

tasks.forEach((task) => render(pageTasks, createTaskTemplate(task), `beforeend`));

render(pageBoard, createLoadMoreButtonTemplate(), `beforeend`);
