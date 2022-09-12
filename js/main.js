import { createAddTaskForm, createTask, noTasks } from "./utiltities.js";
import { getStoredTasks, storeTask, completeTask, deleteTask, editTask } from './storage-util.js'

// render add task form
const addTaskEl = document.querySelector('.add-task');
addTaskEl.append(createAddTaskForm());

// lesten to categories filtering
const categoriesBtnEl = document.querySelectorAll('.tasks-container .categories span');
let currentFilterTerm = categoriesBtnEl[0];
categoriesBtnEl.forEach(btn => btn.onclick = () => filterTasks(btn));

// render all tasks and lesten to their events
window.onload = () => renderTasks();



// handle render tasks
function renderTasks() {

  // loading stored tasks
  let tasks = getStoredTasks();

  // render stored tasks
  const tasksContainerEl = document.querySelector('.tasks');
  while (tasksContainerEl.firstChild) {
    tasksContainerEl.firstChild.remove()
  }
  tasks.forEach(task => tasksContainerEl.prepend(createTask(task)));

  // set default filtering
  filterTasks(currentFilterTerm);

  // lesten to form submitting
  const addTaskFormEl = document.querySelector('.add-task form');
  addTaskFormEl.onsubmit = event => addTaskHandler(event);

  // lesten to task completion
  const markAsDoneBtnsEl = document.querySelectorAll('.task .mark-as-done');
  markAsDoneBtnsEl.forEach(btn => btn.onclick = event => completeTaskHandler(event));

  // leten to task deletion
  const deleteBtnEl = document.querySelectorAll('.task .delete-task');
  deleteBtnEl.forEach(btn => btn.onclick = event => deleteTaskHandler(event));

  // leten to task modification
  const editBtnEl = document.querySelectorAll('.task .edit-task');
  editBtnEl.forEach(btn => btn.onclick = event => editTaskHandler(event));
};

// handle form submiting
function addTaskHandler(e) {
  e.preventDefault();
  if (e.target['task'].value !== '') {
    const taskToAdd = {
      _id: Date.now(),
      text: e.target['task'].value,
      completed: false,
    }
    e.target['task'].value = '';
    storeTask(taskToAdd);
    renderTasks();
    filterTasks(currentFilterTerm);
  }
};

// handle task completion
function completeTaskHandler(e) {
  e.path[2].classList.toggle('done');
  completeTask(e.path[2].dataset.key);
  setTimeout(() => filterTasks(currentFilterTerm), 200);
}

// handle task deletion
function deleteTaskHandler(e) {
  e.path[2].remove();
  deleteTask(e.path[2].dataset.key);
  filterTasks(currentFilterTerm);
}

// handle task modification
function editTaskHandler(e) {
  const taskEl = e.path[2];
  taskEl.append(createAddTaskForm());
  const editTaskForm = document.querySelector('.task form');
  const taskTextEl = taskEl.children[0].children[1];
  editTaskForm['task'].value = taskTextEl.innerText;
  editTaskForm.onsubmit = event => {
    event.preventDefault();
    taskTextEl.innerText = event.target['task'].value;
    editTask(taskEl.dataset.key, event.target['task'].value);
    event.target.remove();
  };
};

// handle category filtering
function filterTasks(term) {
  // store filter term
  currentFilterTerm = term;
  // set active button
  categoriesBtnEl.forEach(btn => btn.classList.remove('active'));
  term.classList.add('active');
  // filter tasks by category
  const tasksEl = document.querySelectorAll('.tasks .task');
  let catTasksCount = 0;
  tasksEl.forEach(task => {
    task.classList.add('hide');
    if (term.dataset.cat === '0' && task.classList.contains('done')) {
      catTasksCount++;
      task.classList.remove('hide');
    } else if (term.dataset.cat === '1' && !task.classList.contains('done')) {
      catTasksCount++;
      task.classList.remove('hide');
    } else if (term.dataset.cat === 'all') {
      catTasksCount++;
      task.classList.remove('hide');
    }
  });
  document.querySelector('.tasks-container .task-count').innerHTML = `(${catTasksCount})`;
  if (catTasksCount === 0) {
    document.querySelector('.tasks .no-tasks')?.remove()
    document.querySelector('.tasks').append(noTasks())
  } else {
    document.querySelector('.tasks .no-tasks')?.remove()
  }
};
