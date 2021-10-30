import Store from './addremove.js';

class Storage {
  static getTodos() {
    let todo;
    if (localStorage.getItem('tasks') === null) {
      todo = [];
    } else {
      todo = JSON.parse(localStorage.getItem('tasks'));
    }

    return todo;
  }

  static addTodos(todo) {
    localStorage.setItem('tasks', JSON.stringify(todo));
  }

  static checkCompleted(id) {
    const completed = Store.getTasks();
    completed.forEach((task) => {
      if (task.index == id) {
        task.completed = true;
      }
    });
    Store.editTasks(completed);
  }

  static markedCompleted(element) {
    if (element.checked === true) {
      element.nextElementSibling.firstElementChild.classList.add('checked');
      Storage.checkCompleted(element.id);
    } else {
      element.nextElementSibling.firstElementChild.classList.remove('checked');
      const todo = Store.getTasks();
      todo.forEach((task) => {
        if (task.index == element.id) {
          task.completed = false;
        }
      });
      Store.editTasks(todo);
    }
  }
}

export default Storage;
