import { myProjectsList, addNewProject } from "./project";
import { myTasksList, addNewTask } from "./task";

const taskList = document.querySelector(".todos");
const projectsList = document.querySelector(".projects");
const formProject = document.querySelector(".new-project");
const formTask = document.querySelector(".new-todo");
const inputs = document.querySelectorAll("input");
const newProjectButton = document.querySelector(".new-project-button");
const newTaskButton = document.querySelector(".new-todo-button");

export function displayProjectsList() {
  for (let i = 0; i < myProjectsList.length; i++) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-item");
    projectDiv.dataset.index = `${i}`;
    projectDiv.textContent = myProjectsList[i].projectTitle;
    projectsList.appendChild(projectDiv);

    projectDiv.addEventListener("click", () => {
      displayAllTasks();
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

export function displayAllTasks() {
  for (let i = 0; i < myTasksList.length; i++) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo-item");
    taskDiv.dataset.index = `${i}`;
    taskDiv.textContent = myTasksList[i].title;
    taskList.appendChild(taskDiv);

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("delete-todo-button");
    deleteTaskButton.textContent = "🗑️";
    taskDiv.appendChild(deleteTaskButton);

    deleteTaskButton.addEventListener("click", () => {
      const taskToDelete = taskDiv.dataset.index;
      removeTodo(taskToDelete);
      taskDiv.textContent = "";
    });

    const completeTaskButton = document.createElement("button");
    completeTaskButton.classList.add("complete-button");
    completeTaskButton.textContent = "⬜";
    taskDiv.appendChild(completeTaskButton);

    completeTaskButton.addEventListener("click", () => {
      const taskToComplete = taskDiv.dataset.index;
      completeTaskButton.textContent = "✅";
      taskToComplete.classList.toggle("complete-todo");
    });
  }
}

newTaskButton.addEventListener("click", () => {
  formTask.classList.remove("new-todo-invisible");
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

formTask.addEventListener("submit", function (event) {
  event.preventDefault();

  const toDoProject = document.querySelector("#project-list").value;
  const todoTitle = document.querySelector(".todo-title").value;
  const todoDescription = document.querySelector(".todo-description").value;
  const todoDueDate = document.querySelector(".todo-due-date").value;
  const todoPriority = document.querySelector("#todo-priority").checked;
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo-item");

  if (todoTitle !== "") {
    taskList.appendChild(newTodo);

    addNewTask(
      toDoProject,
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    formTask.classList.add("new-todo-invisible");
    displayAllTasks();
  }
});
