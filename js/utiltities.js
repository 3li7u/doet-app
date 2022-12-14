// Create add task form
export function createAddTaskForm() {
  return createEl({
    tagName: 'form',
    content: [{
      tagName: 'input',
      attrs: [
        { key: 'autofocus', value: true, },
        { key: 'type', value: 'text', },
        { key: 'name', value: 'task', },
        { key: 'placeholder', value: 'Type something, and hit enter', },
      ],
    }]
  });
};

// Create Task
export function createTask(task) {
  return createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: `task ${task.completed ? 'done' : ''}` }, { key: 'data-key', value: task._id }],
    content: [{
      tagName: 'div',
      attrs: [{ key: 'class', value: 'text' }, { key: 'name', value: 'text' }],
      content: [{
        tagName: 'i',
        attrs: [{ key: 'class', value: 'fas fa-check mark-as-done' }],
        content: ''
      }, {
        tagName: 'p',
        content: task.text,
      }]
    },
    {
      tagName: 'div',
      attrs: [{ key: 'class', value: 'action' }],
      content: [{
        tagName: 'i',
        attrs: [{ key: 'class', value: 'fas fa-pen edit-task' }],
        content: ''
      }, {
        tagName: 'i',
        attrs: [{ key: 'class', value: 'fas fa-trash-alt delete-task' }],
        content: ''
      }]
    }]
  });
};

// no tasks
export function noTasks() {
  return createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'no-tasks' }],
    content: [{
      tagName: 'i',
      attrs: [{ key: 'class', value: 'fas fa-trash-alt' }],
      content: '',
    },
    {
      tagName: 'p',
      content: 'There are no tasks'
    }]
  });
};

// Create El Component
function createEl({ tagName, attrs = null, content = '' }) {
  const el = document.createElement(tagName);
  if (attrs)
    attrs.forEach(({ key, value }) => el.setAttribute(key, value));
  if (typeof content === 'string')
    el.append(document.createTextNode(content));
  else
    content.forEach(cont => el.append(createEl(cont)));
  return el;
};