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
  const tasksContainerEl = document.querySelector('.tasks');
  const taskEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'task' }],
    content: [{
      tagName: 'div',
      attrs: [{ key: 'class', value: 'text' }, { key: 'name', value: 'text' }],
      content: [{
        tagName: 'i',
        attrs: [{ key: 'class', value: 'fas fa-check mark-as-done' }],
        content: ''
      }, {
        tagName: 'p',
        content: task
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
  tasksContainerEl.prepend(taskEl);
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