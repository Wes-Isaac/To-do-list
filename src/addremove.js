// import Todo from './index.js';

class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static editTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static taskSize() {
    const tasks = Store.getTasks();
    return tasks.length + 1;
  }

  static reAssignIndex(tasks) {
    tasks.forEach((element, i) => {
      element.index = i + 1;
    });
    Store.editTasks(tasks);
  }

  static editInput(val, id) {
    const tasks = Store.getTasks();
    tasks.forEach((todo) => {
      if (todo.index == id) {
        todo.task = val;
      }
    });
    Store.editTasks(tasks);
  }

  static makeEditable(element, id) {
    const previousValue = element.value;
    element.removeAttribute('readonly');
    const button = element.nextElementSibling;
    button.innerHTML = '<i class="fas fa-2x fa-trash-alt delete"></i>';
    document.addEventListener(('click'), (e) => {
      if (e.target !== element) {
        if (previousValue !== element.value) {
          Store.editInput(element.value, id);
        }
        element.setAttribute('readonly', 'true');
        button.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
      }
      document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (previousValue !== element.value) {
            Store.editInput(element.value, id);
          }
          element.setAttribute('readonly', 'true');
          button.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
        }
      });
    });
  }
}

export default Store;