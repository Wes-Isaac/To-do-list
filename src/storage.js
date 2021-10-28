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
    const completed = Storage.getTodos();
    completed.forEach((task) => {
      if (task.index == id) {
        task.completed = true;
      }
    });
    Storage.addTodos(completed);
  }

  static markedCompleted(element) {
    if (element.checked === true) {
      element.nextElementSibling.classList.add('checked');
      Storage.checkCompleted(element.id);
    } else {
      element.nextElementSibling.classList.remove('checked');
      const todo = Storage.getTodos();
      todo.forEach((task) => {
        if (task.index == element.id) {
          task.completed = false;
        }
      });
      Storage.addTodos(todo);
    }
  }
}

export default Storage;
