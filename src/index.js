import './main.css';
import Storage from './storage.js';

const listContainer = document.querySelector('.todo-lists');
class Todo {
  constructor(item) {
    this.item = item;
  }

  toDoObjectList = [];

  static initObject() {
    this.toDoObjectList = [
      {
        todoText: 'Do Grocery',
        completed: false,
        index: 2,
      },
      {
        todoText: 'Walk the dog',
        completed: false,
        index: 1,
      },
    ];

    if (!Storage.getTodos().length) {
      Storage.addTodos(this.toDoObjectList);
    }
  }

  static displayToDo() {
    this.toDoObjectList.sort((a, b) => {
      const keyA = a.index;
      const keyB = b.index;
      if (keyA > keyB) {
        return 1;
      }
      if (keyA < keyB) {
        return -1;
      }
      return 0;
    });

    const todos = Storage.getTodos();
    todos.forEach((item) => Todo.addToDo(item));
  }

  static addToDo(item) {
    if (item.completed == true) {
      listContainer.innerHTML += `<div class="list-container">
  <span>
  <input type="checkbox" class="checkbox" id="${item.index}" checked>
  <p class="items checked">${item.todoText}</p></span>
  <i class="fas fa-ellipsis-v"></i>
  </div>`;
    } else {
      listContainer.innerHTML += `<div class="list-container">
    <span>
    <input type="checkbox" class="checkbox" id="${item.index}">
    <p class="items">${item.todoText}</p></span>
    <i class="fas fa-ellipsis-v"></i>
    </div>`;
    }
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
      Todo.checkCompleted(element.id);
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

document.addEventListener('DOMContentLoaded', () => {
  Todo.initObject();
  Todo.displayToDo();
});
document.querySelector('.todo-lists').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    Todo.markedCompleted(e.target);
  }
});
