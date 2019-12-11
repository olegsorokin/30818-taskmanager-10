import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import LoadMoreButtonComponent from './components/load-more-button';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';

const TASK_COUNT = 22;
const TASKS_PER_PAGE = 8;
const tasks = generateTasks(TASK_COUNT);

const pageMain = document.querySelector(`.main`);
const pageControl = document.querySelector(`.main__control`);

render(pageControl, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(tasks).getElement(), RenderPosition.BEFOREEND);
render(pageMain, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

const pageBoard = document.querySelector(`.board`);
const pageTasks = document.querySelector(`.board__tasks`);

render(pageTasks, new TaskEditComponent(tasks[0], 0).getElement(), RenderPosition.BEFOREEND);

let showingTaskCount = TASKS_PER_PAGE;
tasks.slice(1, showingTaskCount).forEach((task) => render(pageTasks, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

if (TASK_COUNT >= TASKS_PER_PAGE) {
  render(pageBoard, new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTaskCount;
    showingTaskCount += TASKS_PER_PAGE;

    tasks.slice(prevTasksCount, showingTaskCount)
      .forEach((task) => render(pageTasks, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

    if (showingTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
