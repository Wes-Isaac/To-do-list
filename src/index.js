import './main.css';

const listContainer = document.querySelector('.todo-lists');
class Todo {
  constructor(item) {
    this.item = item;
  }

  static displayToDo() {
    const toDoObjectList = [
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

    toDoObjectList.sort((a, b) => {
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

    const todos = toDoObjectList;
    todos.forEach((item) => Todo.addToDo(item));
  }

  static addToDo(item) {
    listContainer.innerHTML += `<div class="list-container">
    <span>
    <input type="checkbox">
    <p class="items">${item.todoText}</p>
    </span>
    <p id="${item.index}"></p>
    <i class="fas fa-ellipsis-v"></i>
    </div>`;
  }
}

document.addEventListener('DOMContentLoaded', Todo.displayToDo);
