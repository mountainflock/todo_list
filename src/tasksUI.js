import {
  todoList,
  addNewTask,
  deleteTask,
  changeTaskStatus,
  editTask,
} from "./toDoFunctions";

import { activeProject } from "./projectsUI";

import { format } from "date-fns";

const taskList = document.querySelector(".task-list");

export function updateTaskList(activeProject) {
  taskList.textContent = "";
  displayTaskList(activeProject);
}

addNewTaskButton();

function displayTaskList(activeProject) {
  const projectTasksList = todoList[activeProject].tasks;
  const taskListTitle = document.querySelector(".task-list-title");
  taskListTitle.textContent = todoList[activeProject].title;

  for (let i = 0; i < projectTasksList.length; i++) {
    const taskDiv = document.createElement("div");
    taskDiv.dataset.index = `${i}`;
    taskDiv.classList.add("task-item");
    taskList.appendChild(taskDiv);

    createCompleteTaskButton(taskDiv);
    createTaskTitleDiv(taskDiv);
    createTaskDescriprtionDiv(taskDiv);
    createTaskPriorityDiv(taskDiv);
    createTaskDueDateDiv(taskDiv);
    createEditTaskButton(taskDiv);
    createDeleteTaskButton(taskDiv);
  }
}

function addNewTaskButton() {
  const formTask = document.querySelector(".new-task");
  const newTaskButton = document.querySelector(".new-task-button");

  newTaskButton.addEventListener("click", () => {
    formTask.classList.toggle("new-task-invisible");
  });

  formTask.addEventListener("submit", (event) => {
    event.preventDefault();
    handleNewTaskFormSubmit();
  });
}

function handleNewTaskFormSubmit() {
  const inputs = document.querySelectorAll("input");
  const formTask = document.querySelector(".new-task");
  const taskTitle = document.querySelector(".task-title").value;
  const taskDescription = document.querySelector(".task-description").value;
  const taskDueDate = document.querySelector(".task-due-date").value;
  const taskPriority = document.querySelector("#task-priority").value;
  const taskIsComplete = false;

  const newTask = document.createElement("div");
  newTask.classList.add("task-item");

  if (taskTitle !== "") {
    taskList.appendChild(newTask);
    addNewTask(
      taskTitle,
      taskDescription,
      taskPriority,
      taskDueDate,
      taskIsComplete,
      activeProject
    );

    formTask.classList.toggle("new-task-invisible");

    inputs.forEach((input) => {
      input.value = "";
    });

    updateTaskList(activeProject);
  }
}

function createCompleteTaskButton(taskDiv) {
  const completeTaskButton = document.createElement("button");
  completeTaskButton.classList.add("complete-button");
  taskDiv.appendChild(completeTaskButton);
  if (
    todoList[activeProject].tasks[taskDiv.dataset.index].isComplete === true
  ) {
    completeTaskButton.textContent = "✔️";
    taskDiv.classList.add("complete-task");
  } else {
    completeTaskButton.textContent = "⬜";
    taskDiv.classList.remove("complete-task");
  }
  completeTaskButton.addEventListener("click", () => {
    handleChangeStatusButton(activeProject, taskDiv);
  });
}

function createTaskTitleDiv(taskDiv) {
  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("task-title-div");
  taskDiv.appendChild(taskTitleDiv);
  taskTitleDiv.textContent =
    todoList[activeProject].tasks[taskDiv.dataset.index].title;

  taskTitleDiv.addEventListener("click", () => {
    activeTask = taskTitleDiv.dataset.index;
  });
}

function createTaskDescriprtionDiv(taskDiv) {
  const taskDescriptionDiv = document.createElement("div");
  taskDescriptionDiv.textContent =
    todoList[activeProject].tasks[taskDiv.dataset.index].description;
  taskDescriptionDiv.classList.add("task-description-div");
  taskDiv.appendChild(taskDescriptionDiv);
}

function createTaskPriorityDiv(taskDiv) {
  const taskPriorityDiv = document.createElement("div");
  taskPriorityDiv.textContent =
    todoList[activeProject].tasks[taskDiv.dataset.index].priority;
  taskPriorityDiv.classList.add("task-priority-div");
  if (
    todoList[activeProject].tasks[taskDiv.dataset.index].priority === "High"
  ) {
    taskPriorityDiv.style.color = "#d4575d";
  } else if (
    todoList[activeProject].tasks[taskDiv.dataset.index].priority === "Medium"
  ) {
    taskPriorityDiv.style.color = "#ebb475";
  } else if (
    todoList[activeProject].tasks[taskDiv.dataset.index].priority === "Low"
  ) {
    taskPriorityDiv.style.color = "#7be8bb";
  }
  taskDiv.appendChild(taskPriorityDiv);
}

function createTaskDueDateDiv(taskDiv) {
  const taskDueDateDiv = document.createElement("div");
  if (todoList[activeProject].tasks[taskDiv.dataset.index].dueDate !== "") {
    const dateObject = new Date(
      todoList[activeProject].tasks[taskDiv.dataset.index].dueDate
    );
    const dateMonth = format(dateObject, "MMM");
    const dateDay = format(dateObject, "do");
    const dateFormated = `${dateMonth} ${dateDay}`;
    taskDueDateDiv.textContent = dateFormated;
  }
  taskDueDateDiv.classList.add("task-duedate-div");
  taskDiv.appendChild(taskDueDateDiv);
}

function createEditTaskButton(taskDiv) {
  const editTaskButton = document.createElement("button");
  const editButtonText = document.createElement("span");

  editButtonText.textContent = "edit";
  editButtonText.style.color = "grey";
  editButtonText.classList.add("material-symbols-outlined");
  editTaskButton.appendChild(editButtonText);
  editTaskButton.classList.add("edit-task-button");

  taskDiv.appendChild(editTaskButton);

  editTaskButton.addEventListener("click", () => {
    updateTaskList(activeProject);
    handleEditTaskButton(taskDiv);
  });
}

function createDeleteTaskButton(taskDiv) {
  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("delete-task-button");
  const deleteButtonText = document.createElement("span");

  deleteButtonText.textContent = "delete";
  deleteButtonText.style.color = "grey";
  deleteTaskButton.classList.add("delete-task-button");
  deleteButtonText.classList.add("material-symbols-outlined");
  deleteTaskButton.appendChild(deleteButtonText);
  taskDiv.appendChild(deleteTaskButton);

  deleteTaskButton.addEventListener("click", () => {
    handleDeleteTaskButton(taskDiv);
  });
}

function handleChangeStatusButton(activeProject, taskDiv) {
  const completeTaskButtons = document.querySelectorAll(".complete-button");
  const completeTaskButton = completeTaskButtons[taskDiv.dataset.index];
  changeTaskStatus(activeProject, taskDiv.dataset.index);
  taskDiv.classList.toggle("complete-task");
  if (taskDiv.className === "task-item complete-task") {
    completeTaskButton.textContent = "✔️";
  } else {
    completeTaskButton.textContent = "⬜";
  }
}

function handleDeleteTaskButton(taskDiv) {
  deleteTask(activeProject, taskDiv.dataset.index);
  updateTaskList(activeProject);
}

function handleEditTaskButton(taskDiv) {
  const editTaskButtons = document.querySelectorAll(".edit-task-button");
  const taskTitleDivs = document.querySelectorAll(".task-title-div");
  const taskDescriptionDivs = document.querySelectorAll(
    ".task-description-div"
  );
  const taskPriorityDivs = document.querySelectorAll(".task-priority-div");
  const taskDueDateDivs = document.querySelectorAll(".task-duedate-div");

  editTaskButtons[taskDiv.dataset.index].style.display = "none";
  taskTitleDivs[taskDiv.dataset.index].textContent = "";
  taskDescriptionDivs[taskDiv.dataset.index].textContent = "";
  taskPriorityDivs[taskDiv.dataset.index].textContent = "";
  taskDueDateDivs[taskDiv.dataset.index].textContent = "";
  createTaskEditForm(taskDiv);
  createTaskEditButtons(taskDiv);
}

function createTaskEditForm(taskDiv) {
  const taskEditForm = document.createElement("form");
  taskEditForm.classList.add("task-edit-form");
  const taskDivs = document.querySelectorAll(".task-item");
  const taskTitleDivs = document.querySelectorAll(".task-title-div");
  const taskDescriptionDivs = document.querySelectorAll(
    ".task-description-div"
  );
  const taskPriorityDivs = document.querySelectorAll(".task-priority-div");
  const taskDueDateDivs = document.querySelectorAll(".task-duedate-div");
  const deleteTaskButton = document.querySelectorAll(".delete-task-button");

  const newTaskTitleInput = document.createElement("input");
  newTaskTitleInput.classList.add(".new-task-title-input");
  const newTaskDescriptionInput = document.createElement("input");
  const newTaskPrioritySelect = document.createElement("select");
  newTaskPrioritySelect.classList.add("class-priority-select");
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

  taskTitleDivs[taskDiv.dataset.index].classList.toggle("editing-task");
  taskDivs[taskDiv.dataset.index].removeChild(
    taskDescriptionDivs[taskDiv.dataset.index]
  );
  taskDivs[taskDiv.dataset.index].removeChild(
    taskPriorityDivs[taskDiv.dataset.index]
  );
  taskDivs[taskDiv.dataset.index].removeChild(
    taskDueDateDivs[taskDiv.dataset.index]
  );
  taskDivs[taskDiv.dataset.index].insertBefore(
    taskEditForm,
    deleteTaskButton[taskDiv.dataset.index]
  );

  newTaskTitleInput.value =
    todoList[activeProject].tasks[taskDiv.dataset.index].title;
  newTaskDescriptionInput.value =
    todoList[activeProject].tasks[taskDiv.dataset.index].description;
  newTaskPrioritySelect.value =
    todoList[activeProject].tasks[taskDiv.dataset.index].priority;
  newTaskDueDateInput.value =
    todoList[activeProject].tasks[taskDiv.dataset.index].dueDate;

  taskEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    editTask(
      activeProject,
      taskDiv.dataset.index,
      newTaskTitleInput.value,
      newTaskDescriptionInput.value,
      newTaskPrioritySelect.value,
      newTaskDueDateInput.value
    );
    updateTaskList(activeProject);
  });
}

function createTaskEditButtons(taskDiv) {
  const confirmTaskEditButton = document.createElement("button");
  const cancelTaskEditButton = document.createElement("button");
  const newTaskTitleInputs = document.querySelectorAll(".new-task-title-input");
  confirmTaskEditButton.textContent = "✔️";
  cancelTaskEditButton.textContent = "❌";
  const taskEditForm = document.querySelector(".task-edit-form");

  confirmTaskEditButton.classList.add("confirm-edit-button");
  cancelTaskEditButton.classList.add("cancel-edit-button");

  // newTaskTitleInputs[taskDiv.dataset.index].required = true;

  taskEditForm.appendChild(confirmTaskEditButton);
  taskEditForm.appendChild(cancelTaskEditButton);

  cancelTaskEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateTaskList(activeProject);
  });
}
