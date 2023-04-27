import {
  todoList,
  addNewProject,
  deleteProject,
  addNewTask,
  deleteTask,
  changeTaskStatus,
  renameProject,
  editTask,
} from "./toDoFunctions";
import { format } from "date-fns";

export function renderPage() {
  displayProjectList();
}

let activeProject;

function displayProjectList() {
  addNewProjectButton();
  for (let i = 0; i < todoList.length; i++) {
    const projectList = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.dataset.index = `${i}`;
    projectDiv.classList.add("project-item");
    projectList.appendChild(projectDiv);
    createProjectItem();
  }
}

function createProjectItem() {
  const projectDivs = document.querySelectorAll(".project-item");
  const projectTitleDiv = document.createElement("div");
  projectTitleDiv.classList.add("project-title-div");
  projectDivs.forEach((projectDiv) => {
    const project = todoList[projectDiv.dataset.index];
    projectDiv.appendChild(projectTitleDiv);
    projectTitleDiv.textContent = project.title;
    // const projectIndex = todoList[projectDiv.dataset.index];
    // console.log(projectIndex);
    // projectDiv.addEventListener("click", () => {
    // return projectIndex;
    // });
    return project;
  });

  addEditProjectButton();
  addDeleteProjectButton();

  projectTitleDiv.addEventListener("click", () => {
    updateTaskList();
  });
}

function addEditProjectButton() {
  const projectDivs = document.querySelectorAll(".project-item");
  const editProjectButton = document.createElement("button");
  const editButtonText = document.createElement("span");

  editButtonText.textContent = "edit";
  editButtonText.style.color = "grey";
  editButtonText.classList.add("material-symbols-outlined");
  editProjectButton.appendChild(editButtonText);
  editProjectButton.classList.add("edit-project-button");

  projectDivs.forEach((projectDiv) =>
    projectDiv.appendChild(editProjectButton)
  );

  editProjectButton.addEventListener("click", () => {
    projectDivs.forEach((projectDiv) => {
      const project = todoList[projectDiv.dataset.index];
      hanleEditProjectButton(project);
    });
  });
}

function addDeleteProjectButton() {
  const projectDivs = document.querySelectorAll(".project-item");
  const deleteProjectDiv = document.createElement("div");
  const deleteProjectButton = document.createElement("button");
  const deleteButtonText = document.createElement("span");

  deleteButtonText.textContent = "delete";
  deleteButtonText.style.color = "grey";
  deleteProjectDiv.classList.add("delete-project-div");
  deleteProjectButton.classList.add("delete-project-button");
  deleteButtonText.classList.add("material-symbols-outlined");
  deleteProjectButton.appendChild(deleteButtonText);
  deleteProjectDiv.appendChild(deleteProjectButton);

  projectDivs.forEach((projectDiv) =>
    projectDiv.appendChild(deleteProjectButton)
  );

  deleteProjectButton.addEventListener("click", () => {
    handleDeleteProjectButton();
  });
}

function hanleEditProjectButton(project) {
  const projectDiv = document.querySelector(".project-item");
  const projectDivs = document.querySelectorAll(".project-item");
  const projectList = document.querySelector(".project-list");
  const newProjectTitleForm = document.createElement("form");
  const newProjectTitleInput = document.createElement("input");
  newProjectTitleInput.value = project.title;
  const confirmProjectEditButton = document.createElement("button");
  const cancelProjectEditButton = document.createElement("button");

  confirmProjectEditButton.textContent = "✔️";
  cancelProjectEditButton.textContent = "❌";

  confirmProjectEditButton.classList.add("confirm-edit-button");
  cancelProjectEditButton.classList.add("cancel-edit-button");

  newProjectTitleInput.required = true;

  newProjectTitleForm.appendChild(newProjectTitleInput);
  newProjectTitleForm.appendChild(confirmProjectEditButton);
  newProjectTitleForm.appendChild(cancelProjectEditButton);
  // projectTitleDiv.appendChild(newProjectTitleForm);

  cancelProjectEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    projectTitleDiv.textContent = todoList[i].title;
  });

  newProjectTitleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renameProject(activeProject, newProjectTitleInput.value);
    updateProjectList();
    updateTaskList();
  });
}

function handleDeleteProjectButton() {
  deleteProject(activeProject);
  projectList.removeChild(projectDiv);
  updateProjectList();
}

function addNewProjectButton() {
  const formProject = document.querySelector(".new-project");
  const newProjectButton = document.querySelector(".new-project-button");
  newProjectButton.addEventListener("click", () => {
    formProject.classList.toggle("new-project-invisible");
    handlNewProjectButton();
  });
}

function handlNewProjectButton() {
  const formProject = document.querySelector(".new-project");
  formProject.addEventListener("submit", function (event) {
    event.preventDefault();
    handleNewProjecFormSubmit();
  });
}

function handleNewProjecFormSubmit() {
  const projectList = document.querySelector(".project-list");
  const projectTitle = document.querySelector(".project-title").value;
  const newProject = document.createElement("div");
  const projectTitleInput = document.querySelector(".project-title");
  const formProject = document.querySelector(".new-project");
  newProject.classList.add("project-item");

  if (projectTitle !== "") {
    projectList.appendChild(newProject);
    addNewProject(projectTitle);
    projectTitleInput.value = "";
    formProject.classList.toggle("new-project-invisible");
    updateProjectList();
  }
}

function updateProjectList() {
  projectList.textContent = "";
  displayProjectList();
}

function addNewTaskButton() {
  const formTask = document.querySelector(".new-task");
  const inputs = document.querySelectorAll("input");
  const newTaskButton = document.querySelector(".new-task-button");
  newTaskButton.addEventListener("click", () => {
    formTask.classList.toggle("new-task-invisible");
  });

  formTask.addEventListener("submit", (event) => {
    event.preventDefault();
    handleNewTaskFormSubmit();
  });
}

function displayTaskList(activeProject) {
  addNewTaskButton();
  const projectTasksList = project.tasks;
  projectTasksList.forEach((task) => {
    createTaskItem(task);
  });
}

let activeTask;

function createTaskItem(task) {
  const taskListTitle = document.querySelector(".task-list-title");
  const taskList = document.querySelector(".task-list");
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-item");
  taskListTitle.textContent = activeProject.title;
  taskList.appendChild(taskDiv);
  taskDiv.addEventListener("click", () => {
    activeTask = taskTitleDiv.textContent;
  });

  createTaskTitleDiv();
  createTaskDescriprtionDiv();
  createTaskPriorityDiv();
  createTaskDueDateDiv();
  createEditTaskButton();
  createDeleteTaskButton();
  createCompleteTaskButton();
}

function createTaskTitleDiv() {
  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("task-title-div");
  taskDiv.appendChild(taskTitleDiv);
  taskTitleDiv.textContent = activeTask.title;
}

function createTaskDescriprtionDiv() {
  const taskDescriptionDiv = document.createElement("div");
  taskDescriptionDiv.textContent = projectTasksList[j].description;
  taskDescriptionDiv.classList.add("task-description-div");
  taskDiv.insertBefore(taskDescriptionDiv, taskPriorityDiv);
}

function createTaskPriorityDiv() {
  const taskPriorityDiv = document.createElement("div");
  taskPriorityDiv.textContent = projectTasksList[j].priority;
  taskPriorityDiv.classList.add("priority-div");
  if (projectTasksList[j].priority === "High") {
    taskPriorityDiv.style.color = "#d4575d";
  } else if (projectTasksList[j].priority === "Medium") {
    taskPriorityDiv.style.color = "#ebb475";
  } else if (projectTasksList[j].priority === "Low") {
    taskPriorityDiv.style.color = "#7be8bb";
  }
  taskDiv.insertBefore(taskPriorityDiv, taskDueDateDiv);
}

function createTaskDueDateDiv() {
  const taskDueDateDiv = document.createElement("div");
  if (projectTasksList[j].dueDate !== "") {
    const dateObject = new Date(projectTasksList[j].dueDate);
    const dateMonth = format(dateObject, "MMM");
    const dateDay = format(dateObject, "do");
    const dateFormated = `${dateMonth} ${dateDay}`;
    taskDueDateDiv.textContent = dateFormated;
  }
  taskDueDateDiv.classList.add("due-date-div");
  taskDiv.appendChild(taskDueDateDiv);
}

function createCompleteTaskButton() {
  const completeTaskButton = document.createElement("button");
  completeTaskButton.classList.add("complete-button");
  taskDiv.insertBefore(completeTaskButton, taskTitleDiv);

  if (projectTasksList[j].isComplete === true) {
    completeTaskButton.textContent = "✔️";
    taskDiv.classList.add("complete-task");
  } else {
    completeTaskButton.textContent = "⬜";
    taskDiv.classList.remove("complete-task");
  }
  completeTaskButton.addEventListener("click", () => {
    handleChangeStatusButton();
  });
}

function createDeleteTaskButton() {
  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("delete-task-button");
  deleteTaskButton.textContent = "🗑️";
  taskDiv.appendChild(deleteTaskButton);

  deleteTaskButton.addEventListener("click", () => {
    handleDeleteTaskButton();
  });
}

function createEditTaskButton() {
  const editTaskButton = document.createElement("button");
  editTaskButton.textContent = "✎";
  editTaskButton.classList.add("edit-task-button");
  taskDiv.insertBefore(editTaskButton, deleteTaskButton);

  editTaskButton.addEventListener("click", () => {
    handleEditTaskButton();
  });
}

function handleChangeStatusButton() {
  changeTaskStatus(activeProject, activeTask);
  taskDiv.classList.toggle("complete-task");
  if (taskDiv.className === "task-item complete-task") {
    completeTaskButton.textContent = "✔️";
  } else {
    completeTaskButton.textContent = "⬜";
  }
}

function handleNewTaskFormSubmit() {
  const taskTitle = document.querySelector(".task-title").value;
  const taskDescription = document.querySelector(".task-description").value;
  const taskDueDate = document.querySelector(".task-due-date").value;
  const taskPriority = document.querySelector("#task-priority").value;
  const taskIsComplete = false;

  const newTask = document.createElement("div");

  if (taskTitle !== "") {
    newTask.classList.add("task-item");
    taskList.appendChild(newTask);
    addNewTask(
      taskTitle,
      taskDescription,
      taskPriority,
      taskDueDate,
      taskIsComplete,
      activeProject
    );

    inputs.forEach((item) => {
      inputs[item].value = "";
    });

    formTask.classList.add("new-task-invisible");
    updateTaskList();
  }
}

function handleDeleteTaskButton() {
  deleteTask(todoList[activeProject], parseInt(activeTask));
  updateTaskList();
}

function handleEditTaskButton() {
  editTaskButton.style.display = "none";
  taskTitleDiv.textContent = "";
  taskDescriptionDiv.textContent = "";
  taskPriorityDiv.textContent = "";
  taskDueDateDiv.textContent = "";
  createTaskEditForm();
  createTaskEditButtons();
}

function createTaskEditForm() {
  const taskEditForm = document.createElement("form");
  taskEditForm.classList.add("task-edit-form");
  const newTaskTitleInput = document.createElement("input");
  const newTaskDescriptionInput = document.createElement("input");
  const newTaskPrioritySelect = document.createElement("select");
  const newTaskDueDateInput = document.createElement("input");

  const lowPriorityOption = document.createElement("option");
  lowPriorityOption.textContent = "Low";
  const mediumPriorityOption = document.createElement("option");
  mediumPriorityOption.textContent = "Medium";
  const highPriorityOption = document.createElement("option");
  highPriorityOption.textContent = "High";

  newTaskPrioritySelect.appendChild(lowPriorityOption);
  newTaskPrioritySelect.appendChild(mediumPriorityOption);
  newTaskPrioritySelect.appendChild(highPriorityOption);

  newTaskDueDateInput.type = "date";

  taskEditForm.appendChild(newTaskTitleInput);
  taskEditForm.appendChild(newTaskDescriptionInput);
  taskEditForm.appendChild(newTaskPrioritySelect);
  taskEditForm.appendChild(newTaskDueDateInput);

  taskTitleDiv.classList.toggle("editing-task");
  taskDiv.removeChild(taskDescriptionDiv);
  taskDiv.removeChild(taskPriorityDiv);
  taskDiv.removeChild(taskDueDateDiv);
  taskTitleDiv.appendChild(taskEditForm);

  newTaskTitleInput.value = activeTask.title;
  newTaskDescriptionInput.value = activeTask.description;
  newTaskPrioritySelect.value = activeTask.priority;
  newTaskDueDateInput.value = activeTask.dueDate;

  taskEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    editTask(
      activeProject,
      activeTask,
      newTaskTitleInput.value,
      newTaskDescriptionInput.value,
      newTaskPrioritySelect.value,
      newTaskDueDateInput.value
    );
    updateTaskList();
  });
}

function createTaskEditButtons() {
  const confirmTaskEditButton = document.createElement("button");
  const cancelTaskEditButton = document.createElement("button");
  confirmTaskEditButton.textContent = "✔️";
  cancelTaskEditButton.textContent = "❌";

  confirmTaskEditButton.classList.add("confirm-edit-button");
  cancelTaskEditButton.classList.add("cancel-edit-button");

  newTaskTitleInput.required = true;

  taskEditForm.appendChild(confirmTaskEditButton);
  taskEditForm.appendChild(cancelTaskEditButton);

  cancelTaskEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateTaskList();
  });
}

function updateTaskList() {
  taskList.textContent = "";
  displayTaskList(activeProject);
}
