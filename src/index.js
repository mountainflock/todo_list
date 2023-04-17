import "./style.css";
import "date-fns";

class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }
}

class Todo extends Project {
  constructor(projectTitle, title, description, dueDate, priority) {
    super(projectTitle);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const allProjects = new Project("All");
const workProjects = new Project("Work");
const studyProjects = new Project("Study");
const leisureProjects = new Project("Leisure");

const todo1 = new Todo(
  "Home",
  "Do laundry",
  "Black and color",
  "21.04.2022",
  "Medium"
);
const todo2 = new Todo(
  "Work",
  "Delete unecessary mail",
  "Filter inboxes",
  "31.04.2023"
);
const todo3 = new Todo("Study", "Finish JS Course", "Odin", "31.05.2023");
const todo4 = new Todo(
  "Leisure",
  "Watch Loro film",
  "On the TV screen",
  "20.04.2023"
);

let myTodoList = [todo1, todo2, todo3, todo4];
let myProjectsList = [
  allProjects,
  workProjects,
  studyProjects,
  leisureProjects,
];

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

function addNewTodo(
  projectTitle,
  title,
  description,
  dueDate,
  priority,
  isComplete
) {
  const todoItem = new Todo(
    projectTitle,
    title,
    description,
    dueDate,
    priority,
    isComplete
  );
  myTodoList.push(todoItem);
}

function displayProjectsList() {
  for (let i = 0; i < myProjectsList.length; i++) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-item");
    projectDiv.dataset.index = `${i}`;
    projectDiv.textContent = myProjectsList[i].projectTitle;
    projectsList.appendChild(projectDiv);

    projectDiv.addEventListener("click", () => {
      // document.querySelector("todos").
    });

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project-button");
    deleteProjectButton.textContent = "🗑️";
    projectDiv.appendChild(deleteProjectButton);

    deleteProjectButton.addEventListener("click", () => {
      const projectToDelete = projectDiv.dataset.index;
      removeProject(projectToDelete);
      projectDiv.textContent = "";
    });
  }
}

function displayTodoList() {
  for (let i = 0; i < myTodoList.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.dataset.index = `${i}`;
    todoDiv.textContent = myTodoList[i].title;
    todoList.appendChild(todoDiv);

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo-button");
    deleteTodoButton.textContent = "🗑️";
    todoDiv.appendChild(deleteTodoButton);

    deleteTodoButton.addEventListener("click", () => {
      const todoToDelete = todoDiv.dataset.index;
      removeTodo(todoToDelete);
      todoDiv.textContent = "";
    });

    const completeTodoButton = document.createElement("button");
    completeTodoButton.classList.add("complete-button");
    completeTodoButton.textContent = "◻️";
    todoDiv.appendChild(completeTodoButton);

    completeTodoButton.addEventListener("click", () => {
      const todoToComplete = todoDiv.dataset.index;
      completeTodoButton.textContent = "☑️";
      todoToComplete.classList.toggle("complete-todo");
    });
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

  const toDoProject = document.querySelector("#project-list").value;
  const todoTitle = document.querySelector(".todo-title").value;
  const todoDescription = document.querySelector(".todo-description").value;
  const todoDueDate = document.querySelector(".todo-due-date").value;
  const todoPriority = document.querySelector("#todo-priority").checked;
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo-item");

  if (todoTitle !== "") {
    todoList.appendChild(newTodo);

    addNewTodo(
      toDoProject,
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
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
}

function removeProject(project) {
  myProjectsList = myProjectsList.filter(function (projects) {
    return projects !== myProjectsList[project];
  });
}

// function createElement(tag, parent, textContent, classList) {
//   const element = document.createElement(tag);
//   if (textContent != null) {
//     element.textContent = textContent;
//   }
//   if (classList != null) {
//     element.classList.add(...classList);
//   }
//   parent.appendChild(element);
//   return element;
// }

// function createProjectItem(i) {
//   const projectItem = createElement("div", projectsList, null, ["project"]);
//   projectItem.dataset.index = `${i}`;

//   const todoItem = createElement("div", todoList, null, "todo");
//   todoItem.dataset.index = `${i}`;

//   const deleteProjectButton = createElement("button", projectItem, "🗑️", [
//     "delete-project-button",
//   ]);
//   deleteProjectButton.addEventListener("click", () => {
//     const projectToDelete = projectItem.dataset.index;
//     removeProject(projectToDelete);
//   });

//   const deleteTodoButton = createElement("button", todoItem, "🗑️", [
//     "delete-item-button",
//   ]);
//   deleteTodoButton.addEventListener("click", () => {
//     const todoToDelete = todoItem.dataset.index;
//     removeProject(projectToDelete);
//   });

//   const changeStatusButton = createElement("button", todoItem, "⚪", [
//     "change-status-button",
//   ]);
//   changeStatusButton.addEventListener("click", () => {
//     const itemToStatusChange = todoItem.dataset.index;
//     changeStatus(itemToStatusChange);
//   });
// }
