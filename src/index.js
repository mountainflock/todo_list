import "./style.css";
import "date-fns";

class Todo {
  constructor(title, description, dueDate, priority, isComplete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }
}

class Project {
  constructor(title) {
    this.title = title;
  }
}

const todo1 = new Todo("Work", "Work hard", "21.02.2029", "High", false);
const todo2 = new Todo("Study", "Work hard", "21.02.2029", "Medium", true);
const todo3 = new Todo("Sleep", "Work hard", "15.01.2000", "Low", false);
const todo4 = new Todo("Rest", "Work hard", "21.02.2029", "High", true);

const project1 = new Project("Work");
const project2 = new Project("Study");
const project3 = new Project("Sport");
const project4 = new Project("Leasure");

let myTodoList = [todo1, todo2, todo3, todo4];
let myProjectsList = [project1, project2, project2, project4];

const todoList = document.querySelector(".todos");
const projectsList = document.querySelector(".projects");

const formProject = document.querySelector(".new-project");
const formTodo = document.querySelector(".new-todo");

const inputs = document.querySelectorAll("input");

const newProjectButton = document.querySelector(".new-project-button");
const newTodoButton = document.querySelector(".new-todo-button");

const submitProjectButton = document.querySelector(".project-submit");
const submitTodoButton = document.querySelector(".todo-submit");

function addNewProject(title) {
  const project = new Project(title);
  myProjectsList.push(project);
}

function addNewTodo(title, description, dueDate, priority, isComplete) {
  const todoItem = new Todo(title, description, dueDate, priority, isComplete);
  myTodoList.push(todoItem);
}

function displayProjectsList() {
  for (let i = 0; i < myProjectsList.length; i++) {
    //   createElement(i);
  }
}

function displayTodoList() {
  for (let i = 0; i < myTodoList.length; i++) {
    // createElement(i);
  }
}

function changeStatus(todo) {
  if (myTodoList[todo].isComplete === true) {
    myTodoList[todo].isComplete = false;
  } else {
    myTodoList[todo].isComplete = true;
  }
  //   todoList.textContent = "";
  displayTodoList();
}

function removeTodo(todo) {
  myTodoList = myTodoList.filter(function (todos) {
    return todos !== myTodoList[todo];
  });
  //   todoList.textContent = "";
  displayTodoList();
}

function removeProject(project) {
  myTodoList = myTodoList.filter(function (projects) {
    return projects !== myProjectsList[project];
  });
  //   todoList.textContent = "";
  displayProjectsList();
}

newTodoButton.addEventListener("click", () => {
  formTodo.classList.remove("new-todo-invisible");
});

newProjectButton.addEventListener("click", () => {
  formProject.classList.remove("new-project-invisible");
});

formTodo.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoTitle = document.querySelector(".todo-title").value;
  const todoDescription = document.querySelector(".todo-description").value;
  const todoDueDate = document.querySelector(".todo-due-date").value;
  const todoPriority = document.querySelector("#todo-priority").checked;
  //   const todoComplete

  if (todoTitle !== "") {
    addNewTodo(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      todoComplete
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    todoList.textContent = "";
    formTodo.classList.add("new-todo-invisible");
    displayTodoList();
  }
});

formProject.addEventListener("submit", function (event) {
  event.preventDefault();
  const projectTitle = document.querySelector(".project-title").value;

  if (projectTitle !== "") {
    addNewProject(projectTitle);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    projectsList.textContent = "";
    formProject.classList.add("new-project-invisible");
    displayProjectsList();
  }
});

displayTodoList();

// function createElement(tag, parent, textContent, classList) {
//   const el = document.createElement(tag);
//   if (textContent != null) {
//     el.textContent = textContent;
//   }
//   if (classList != null) {
//     el.classList.add(...classList);
//   }
//   parent.appendChild(el);
//   return el;
// }

// function createElement(i) {
//   const bookItem = createElement("div", todoList, null, [
//     "book",
//     ...(myList[i].read ? ["book-item-status-read"] : []),
//   ]);
//   bookItem.dataset.index = `${i}`;

//   createElement("div", bookItem, `${myList[i].title}`, [
//     "book-item-text",
//     "book-item-title",
//   ]);

//   createElement("div", bookItem, `${myList[i].author}`, [
//     "book-item-text",
//     "book-item-author",
//   ]);

//   createElement("div", bookItem, `${myList[i].pages} pages`, [
//     "book-item-text",
//     "book-item-pages",
//   ]);

//   createElement("div", bookItem, myList[i].read ? "read" : "unread", [
//     "book-item-text",
//     "book-item-read",
//   ]);

//   const bookButtonsSection = createElement("div", bookItem, null, [
//     "book-button-section",
//   ]);

//   const deleteButton = createElement("button", bookButtonsSection, "🗑️", [
//     "delete-button",
//   ]);
//   deleteButton.addEventListener("click", () => {
//     const itemToDelete = bookItem.dataset.index;
//     removeTodo(itemToDelete);
//   });

//   const changeStatusButton = createElement(
//     "button",
//     bookButtonsSection,
//     "Change status",
//     ["change-status-button"]
//   );
//   changeStatusButton.addEventListener("click", () => {
//     const itemToStatusChange = bookItem.dataset.index;
//     changeStatus(itemToStatusChange);
//   });
// }
