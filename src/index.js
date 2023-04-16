import { getDate } from "date-fns";
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

const todo1 = new Todo("Read", "Good books only", "21.02.2029", "High", false);
const todo2 = new Todo(
  "Learn",
  "It's not that hard",
  "21.02.2029",
  "Medium",
  true
);
const todo3 = new Todo("Sleep", "", "15.01.2000", "Low", false);
const todo4 = new Todo(
  "Rest",
  "Rest is everything",
  "21.02.2029",
  "High",
  true
);

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

function addNewProject(title) {
  const project = new Project(title);
  myProjectsList.push(project);
}

function addNewTodo(title, description, dueDate, priority, isComplete) {
  const todoItem = new Todo(title, description, dueDate, priority, isComplete);
  myTodoList.push(todoItem);
}

function displayProjectsList() {
  const projectDivs = document.querySelectorAll(".project-item");
  for (let i = 0; i < myProjectsList.length; i++) {
    projectDivs[i].textContent = myProjectsList[i].title;
  }
}

function displayTodoList() {
  const todoDivs = document.querySelectorAll(".todo-item");
  for (let i = 0; i < myTodoList.length; i++) {
    todoDivs[i].textContent = myTodoList[i].title;
  }
}
newTodoButton.addEventListener("click", () => {
  formTodo.classList.remove("new-todo-invisible");
});

newProjectButton.addEventListener("click", () => {
  formProject.classList.remove("new-project-invisible");
});

formProject.addEventListener("submit", function (event) {
  event.preventDefault();
  const projectTitle = document.querySelector(".project-title").value;
  const newProject = document.createElement("div");
  newProject.classList.add("project-item");

  if (projectTitle !== "") {
    projectsList.appendChild(newProject);
    addNewProject(projectTitle);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    formProject.classList.add("new-project-invisible");
    displayProjectsList();
  }
});

formTodo.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoTitle = document.querySelector(".todo-title").value;
  const todoDescription = document.querySelector(".todo-description").value;
  const todoDueDate = document.querySelector(".todo-due-date").value;
  const todoPriority = document.querySelector("#todo-priority").checked;
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo-item");
  //   const todoComplete

  if (todoTitle !== "") {
    todoList.appendChild(newTodo);

    addNewTodo(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
      //   todoComplete
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    formTodo.classList.add("new-todo-invisible");
    displayTodoList();
  }
});

displayTodoList();
displayProjectsList();

function changeStatus(todo) {
  if (myTodoList[todo].isComplete === true) {
    myTodoList[todo].isComplete = false;
  } else {
    myTodoList[todo].isComplete = true;
  }
  todoList.textContent = "";
  displayTodoList();
}

function removeTodo(todo) {
  myTodoList = myTodoList.filter(function (todos) {
    return todos !== myTodoList[todo];
  });
  todoList.textContent = "";
  displayTodoList();
}

function removeProject(project) {
  myTodoList = myTodoList.filter(function (projects) {
    return projects !== myProjectsList[project];
  });
  todoList.textContent = "";
  displayProjectsList();
}

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
