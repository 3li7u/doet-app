// get tasks from localstorage
export function getStoredTasks() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// set task to localstorage
export function storeTask(task) {
  localStorage.setItem('tasks', JSON.stringify([...getStoredTasks(), task]));
}

// mark task as completed
export function completeTask(taskId) {
  const editedTasks = getStoredTasks().map(task => {
    if (task._id == taskId) task.completed = !task.completed;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(editedTasks));
};

// edit task text
export function editTask(taskId, newTaskText) {
  const editedTasks = getStoredTasks().map(task => {
    if (task._id == taskId) task.text = newTaskText;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(editedTasks));
};

// delete task
export function deleteTask(taskId) {
  const editedTasks = getStoredTasks().filter(task => task._id != taskId);
  localStorage.setItem('tasks', JSON.stringify(editedTasks));
};
