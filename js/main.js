import { createAddTaskForm, createTask } from "./utiltities.js";

// render add task form
const addTaskEl = document.querySelector('.add-task');
addTaskEl.append(createAddTaskForm());

// lesten to form submitting
const addTaskFormEl = document.querySelector('.add-task form');
addTaskFormEl.onsubmit = event => addTask(event);

// lesten to categories filtering
const categoriesBtnEl = document.querySelectorAll('.tasks-container .categories span');
categoriesBtnEl.forEach(btn => btn.onclick = () => filterTasks(btn));

// set default filtering
let currentFilterTerm = categoriesBtnEl[0];
filterTasks(currentFilterTerm);


// handle form submiting
function addTask(e) {
  e.preventDefault();
  createTask(e.target['task'].value);
  e.target['task'].value = '';
  filterTasks(currentFilterTerm);
  // lesten to task completion
  const markAsDoneBtnsEl = document.querySelectorAll('.task .mark-as-done');
  markAsDoneBtnsEl.forEach(btn => btn.onclick = event => endTask(event));
  // leten to task deletion
  const deleteBtnEl = document.querySelectorAll('.task .delete-task');
  deleteBtnEl.forEach(btn => btn.onclick = event => deleteTask(event));
  // leten to task modification
  const editBtnEl = document.querySelectorAll('.task .edit-task');
  editBtnEl.forEach(btn => btn.onclick = event => editTask(event));
};

// handle task completion
function endTask(e) {
  e.path[2].classList.toggle('done');
  e.target.classList.toggle('ckecked');
  e.target.nextElementSibling.classList.toggle('strik-through');
  setTimeout(() => filterTasks(currentFilterTerm), 200);
}

// handle task deletion
function deleteTask(e) {
  e.path[2].remove();
  filterTasks(currentFilterTerm);
}

// handle task modification
function editTask(e) {
  const taskEl = e.path[2];
  taskEl.append(createAddTaskForm());
  const editTaskForm = document.querySelector('.task form');
  const taskTextEl = taskEl.children[0].children[1];
  editTaskForm['task'].value = taskTextEl.innerText;
  editTaskForm.onsubmit = event => {
    event.preventDefault();
    taskTextEl.innerText = event.target['task'].value;
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
  document.querySelector('.tasks-container .task-count').innerHTML = catTasksCount;
};
