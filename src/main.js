import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import BoardController from './controllers/board';
import TasksModel from './models/tasks';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils/render';

const TASK_COUNT = 22;
const tasks = generateTasks(TASK_COUNT);

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(tasks), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(pageMain, boardComponent, RenderPosition.BEFOREEND);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render();
