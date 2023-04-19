import { myProjectsList, addNewProject } from "./project";
import { myTasksList, addNewTask, removeTask } from "./task";

const taskList = document.querySelector(".tasks");
const projectsList = document.querySelector(".projects");
const formProject = document.querySelector(".new-project");
const formTask = document.querySelector(".new-task");
const inputs = document.querySelectorAll("input");
const newProjectButton = document.querySelector(".new-project-button");
const newTaskButton = document.querySelector(".new-task-button");

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
    taskDiv.dataset.index = `${i}`;
    taskDiv.textContent = myTasksList[i].title;
    taskList.appendChild(taskDiv);

    const completeTaskButton = document.createElement("button");
    completeTaskButton.classList.add("complete-button");
    completeTaskButton.textContent = "⬜";
    taskDiv.appendChild(completeTaskButton);

    completeTaskButton.addEventListener("click", () => {
      taskDiv.classList.toggle("complete-task");
      if (taskDiv.className === "complete-task") {
        completeTaskButton.textContent = "✅";
      } else {
        completeTaskButton.textContent = "⬜";
      }
    });

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("delete-task-button");
    deleteTaskButton.textContent = "🗑️";
    taskDiv.appendChild(deleteTaskButton);

    deleteTaskButton.addEventListener("click", () => {
      const taskToDelete = taskDiv.dataset.index;
      removeTask(taskToDelete);
      taskDiv.textContent = "";
    });
  }
}

newTaskButton.addEventListener("click", () => {
  formTask.classList.remove("new-task-invisible");
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

  const taskProject = document.querySelector("#project-list").value;
  const taskTitle = document.querySelector(".task-title").value;
  const taskDescription = document.querySelector(".task-description").value;
  const taskDueDate = document.querySelector(".task-due-date").value;
  const taskPriority = document.querySelector("#task-priority").checked;
  const newTask = document.createElement("div");
  newTask.classList.add("task-item");

  if (taskTitle !== "") {
    taskList.appendChild(newTask);

    addNewTask(
      taskProject,
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    formTask.classList.add("new-task-invisible");
    displayAllTasks();
  }
});

export function renderPage() {
  displayProjectsList();
  displayAllTasks();
}
