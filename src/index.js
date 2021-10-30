import './main.css';
import Storage from './storage.js';
import Store from './addremove.js';

const listContainer = document.querySelector('.todo-lists');
class Todo {
  constructor(task, completed = false, index = 1) {
    this.task = task;
    this.completed = completed;
    this.index = index;
  }

  static sortTasks() {
    const todos = Store.getTasks();
    todos.sort((a, b) => {
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
    Store.editTasks(todos);
  }

  static displayTask() {
    Todo.sortTasks();
    const todos = Store.getTasks();
    listContainer.innerHTML = '';
    todos.forEach((item) => Todo.addTask(item));
  }

  static addTask(item) {
    if (item.completed == true) {
      listContainer.innerHTML += `<div class="list-container">
      <input type="checkbox" class="checkbox" id="${item.index}"  checked>
      <span>
          <input class="items checked" readonly value ="${item.task}"/>
          <button><i class="fas fa-ellipsis-v"></i></button>
      </span>
      </div>`;
    } else {
      listContainer.innerHTML += `<div class="list-container">
      <input type="checkbox" class="checkbox" id="${item.index}">
      <span>
          <input class="items" readonly value ="${item.task}"/>
          <button><i class="fas fa-ellipsis-v"></i></button>
      </span>
      </div>`;
    }
  }

  static deleteTask(id) {
    const tasks = Store.getTasks();
    const newTasks = tasks.filter((element) => element.index != id);
    Store.reAssignIndex(newTasks);
    Todo.displayTask();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Todo.displayTask();
});

document.querySelector('.todo-lists').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    Storage.markedCompleted(e.target);
  }

  if (e.target.classList.contains('delete')) {
    Todo.deleteTask(e.target.parentElement.parentElement.previousElementSibling.id);
  } else if (e.target.classList.contains('items') && !(e.target.classList.contains('delete'))) {
    let id = e.target.parentElement;
    id = id.previousElementSibling;
    id = id.id;
    Store.makeEditable(e.target, id);
  }
});

function add(e) {
  const task = document.querySelector('#myInput').value;
  if (task !== '') {
    e.preventDefault();
    const todo = new Todo(task, false, Store.taskSize());
    Todo.addTask(todo);
    Store.addTask(todo);
    document.querySelector('form').reset();
  }
}

document.querySelector('form').addEventListener('submit', add);
document.querySelector('.enterArrow').addEventListener('click', add);

document.querySelector('.clear').addEventListener('click', () => {
  const tasks = Store.getTasks();
  const newTasks = tasks.filter((element) => element.completed == false);
  Store.reAssignIndex(newTasks);
  Todo.displayTask();
});

export default Todo;