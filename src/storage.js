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
}

export default Storage;
