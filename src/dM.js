import { myProjectsList, addProject, deleteProject } from "./project";
import { myTasksList, addTask, deleteTask, changeTaskStatus } from "./task";
import { format } from "date-fns";

export function renderPage() {
  displayProjectsList();
  displayTasksList();
}

function displayProjectsList() {
  const projectsList = document.querySelector(".project-list");
  const newProjectButton = document.querySelector(".new-project-button");
  const formProject = document.querySelector(".new-project");
  const inputs = document.querySelectorAll("input");

  function renderProjectList() {
    for (let i = 0; i < myProjectsList.length; i++) {
      const projectDiv = document.createElement("div");
      const projectTitleDiv = document.createElement("div");
      projectTitleDiv.classList.add("project-title-div");
      projectDiv.appendChild(projectTitleDiv);
      projectDiv.classList.add("project-item");
      projectDiv.dataset.index = `${i}`;
      projectTitleDiv.textContent = myProjectsList[i].projectTitle;
      projectsList.appendChild(projectDiv);
      const deleteProjectDiv = document.createElement("div");
      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.classList.add("delete-project-button");
      deleteProjectDiv.classList.add("delete-project-div");
      deleteProjectButton.textContent = "🗑️";
      deleteProjectDiv.appendChild(deleteProjectButton);
      projectDiv.appendChild(deleteProjectDiv);
      const editProjectButton = document.createElement("button");
      editProjectButton.textContent = "✎";
      editProjectButton.classList.add("edit-project-button");
      projectDiv.insertBefore(editProjectButton, deleteProjectDiv);

      newProjectButton.addEventListener("click", () => {
        formProject.classList.toggle("new-project-invisible");
      });

      formProject.addEventListener("submit", function (event) {
        event.preventDefault();
        handleNewProjecFormSubmit();
      });

      deleteProjectButton.addEventListener("click", () => {
        handleDeleteProjectButton();
      });

      editProjectButton.addEventListener("click", () => {
        hanleEditProjectButton();
      });

      projectTitleDiv.addEventListener("click", () => {
        displayTasksList(myProjectsList[i]);
      });

      function handleDeleteProjectButton() {
        const projectToDelete = projectDiv.dataset.index;
        deleteProject(projectToDelete);
        projectsList.removeChild(projectDiv);
        projectsList.textContent = "";
        displayProjectsList();
      }

      function handleNewProjecFormSubmit() {
        const projectTitle = document.querySelector(".project-title").value;
        const newProject = document.createElement("div");
        newProject.classList.add("project-item");

        if (projectTitle !== "") {
          projectsList.appendChild(newProject);
          addProject(projectTitle);
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
          formProject.classList.toggle("new-project-invisible");
          projectsList.textContent = "";
          displayProjectsList();
        }
      }

      function hanleEditProjectButton() {}
    }
  }
  renderProjectList();
}

function displayTasksList() {
  function renderTaskList() {
    const projectTasksList = myTasksList;
    const taskList = document.querySelector(".task-list");
    const formTask = document.querySelector(".new-task");
    const inputs = document.querySelectorAll("input");
    const newTaskButton = document.querySelector(".new-task-button");
    for (let i = 0; i < projectTasksList.length; i++) {
      const taskDiv = document.createElement("div");
      const taskTitleDiv = document.createElement("div");
      taskTitleDiv.classList.add("task-title-div");
      taskDiv.appendChild(taskTitleDiv);
      taskDiv.classList.add("task-item");
      taskDiv.dataset.index = `${i}`;
      taskTitleDiv.textContent = projectTasksList[i].title;
      taskList.appendChild(taskDiv);

      const dueDateDiv = document.createElement("div");
      if (projectTasksList[i].dueDate !== "") {
        const dateObject = new Date(projectTasksList[i].dueDate);
        const dateMonth = format(dateObject, "MMM");
        const dateDay = format(dateObject, "do");
        const dateFormated = `${dateMonth} ${dateDay}`;
        dueDateDiv.textContent = dateFormated;
      }
      dueDateDiv.classList.add("due-date-div");
      taskDiv.appendChild(dueDateDiv);

      const priorityDiv = document.createElement("div");
      priorityDiv.textContent = projectTasksList[i].priority;
      priorityDiv.classList.add("priority-div");
      if (projectTasksList[i].priority === "High") {
        priorityDiv.style.color = "#d4575d";
      } else if (projectTasksList[i].priority === "Medium") {
        priorityDiv.style.color = "#ebb475";
      } else if (projectTasksList[i].priority === "Low") {
        priorityDiv.style.color = "#7be8bb";
      }
      taskDiv.insertBefore(priorityDiv, dueDateDiv);

      const taskDescriptionDiv = document.createElement("div");
      taskDescriptionDiv.textContent = projectTasksList[i].description;
      taskDescriptionDiv.classList.add("task-description-div");
      taskDiv.insertBefore(taskDescriptionDiv, dueDateDiv);

      const completeTaskButton = document.createElement("button");
      completeTaskButton.classList.add("complete-button");
      taskDiv.insertBefore(completeTaskButton, taskTitleDiv);

      if (projectTasksList[i].isComplete === true) {
        completeTaskButton.textContent = "✔️";
        taskDiv.classList.add("complete-task");
      } else {
        completeTaskButton.textContent = "⬜";
        taskDiv.classList.remove("complete-task");
      }

      completeTaskButton.addEventListener("click", () => {
        handleChangeStatusButton();
      });

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("delete-task-button");
      deleteTaskButton.textContent = "🗑️";
      taskDiv.appendChild(deleteTaskButton);

      deleteTaskButton.addEventListener("click", () => {
        handleDeleteTaskBtton();
      });

      const editTaskButton = document.createElement("button");
      editTaskButton.textContent = "✎";
      editTaskButton.classList.add("edit-task-button");
      taskDiv.insertBefore(editTaskButton, deleteTaskButton);
      editTaskButton.addEventListener("click", () => {
        editTask();
      });

      newTaskButton.addEventListener("click", () => {
        formTask.classList.toggle("new-task-invisible");
      });

      formTask.addEventListener("submit", (event) => {
        event.preventDefault();
        handleNewTaskFormSubmit();
      });

      function handleChangeStatusButton() {
        changeTaskStatus(projectTasksList[i]);
        taskDiv.classList.toggle("complete-task");
        if (taskDiv.className === "task-item complete-task") {
          completeTaskButton.textContent = "✔️";
        } else {
          completeTaskButton.textContent = "⬜";
        }
      }

      function handleNewTaskFormSubmit() {
        const taskProject = document.querySelector("#project-list").value;
        const taskTitle = document.querySelector(".task-title").value;
        const taskDescription =
          document.querySelector(".task-description").value;
        const taskDueDate = document.querySelector(".task-due-date").value;
        const taskPriority = document.querySelector("#task-priority").value;

        const newTask = document.createElement("div");

        if (taskTitle !== "") {
          newTask.classList.add("task-item");
          taskList.appendChild(newTask);

          addTask(
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
          taskList.textContent = "";
          renderTaskList();
        }
      }

      function handleDeleteTaskBtton() {
        const taskToDelete = taskDiv.dataset.index;
        deleteTask(taskToDelete);
        taskList.textContent = "";
        renderTaskList();
      }
    }
  }
  renderTaskList();
}
