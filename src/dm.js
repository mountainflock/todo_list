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

function displayProjectList() {
  const projectList = document.querySelector(".project-list");
  const newProjectButton = document.querySelector(".new-project-button");
  const newTaskButton = document.querySelector(".new-task-button");
  const formProject = document.querySelector(".new-project");
  const inputs = document.querySelectorAll("input");
  const taskList = document.querySelector(".task-list");
  const taskListTitle = document.querySelector(".task-list-title");

  newProjectButton.addEventListener("click", () => {
    formProject.classList.toggle("new-project-invisible");
  });
  for (let i = 0; i < todoList.length; i++) {
    const projectDiv = document.createElement("div");
    const projectTitleDiv = document.createElement("div");

    projectTitleDiv.classList.add("project-title-div");
    projectDiv.appendChild(projectTitleDiv);
    projectDiv.classList.add("project-item");
    projectDiv.dataset.index = `${i}`;
    projectTitleDiv.textContent = todoList[i].title;
    projectTitleDiv.dataset.index = `${i}`;
    projectList.appendChild(projectDiv);

    const deleteProjectDiv = document.createElement("div");
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project-button");
    deleteProjectDiv.classList.add("delete-project-div");
    deleteProjectButton.textContent = "🗑️";
    deleteProjectDiv.appendChild(deleteProjectButton);
    projectDiv.appendChild(deleteProjectDiv);

    const editProjectButton = document.createElement("button");
    const editButtonText = document.createElement("span");
    editButtonText.textContent = "edit";
    editButtonText.style.color = "grey";
    editButtonText.classList.add("material-icons");
    editProjectButton.appendChild(editButtonText);
    editProjectButton.classList.add("edit-project-button");
    projectDiv.insertBefore(editProjectButton, deleteProjectDiv);

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
      newTaskButton.classList.remove("new-task-button-invisible");
      updateTaskList();
    });

    function handleDeleteProjectButton() {
      const projectToDelete = projectDiv.dataset.index;
      deleteProject(projectToDelete);
      projectList.removeChild(projectDiv);
      updateProjectList();
    }

    function handleNewProjecFormSubmit() {
      const projectTitle = document.querySelector(".project-title").value;
      const newProject = document.createElement("div");
      newProject.classList.add("project-item");

      if (projectTitle !== "") {
        projectList.appendChild(newProject);
        addNewProject(projectTitle);
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = "";
        }
        formProject.classList.toggle("new-project-invisible");
        updateProjectList();
      }
    }

    function hanleEditProjectButton() {
      const projectToEdit = projectDiv.dataset.index;
      updateTaskList();
      projectTitleDiv.textContent = "";
      const newProjectTitleForm = document.createElement("form");
      const newProjectTitleInput = document.createElement("input");
      newProjectTitleInput.value = todoList[i].title;
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
      projectTitleDiv.appendChild(newProjectTitleForm);

      cancelProjectEditButton.addEventListener("click", (event) => {
        event.preventDefault();
        projectTitleDiv.textContent = todoList[i].title;
      });

      newProjectTitleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renameProject(projectToEdit, newProjectTitleInput.value);
        updateProjectList();
        updateTaskList();
      });
    }

    function updateTaskList() {
      taskList.textContent = "";
      displayTaskList(i);
    }

    function updateProjectList() {
      projectList.textContent = "";
      displayProjectList();
    }

    function displayTaskList(projectListIndex) {
      const project = todoList[projectListIndex];
      taskListTitle.textContent = project.title;
      const taskList = document.querySelector(".task-list");
      const formTask = document.querySelector(".new-task");
      const inputs = document.querySelectorAll("input");
      const newTaskButton = document.querySelector(".new-task-button");

      newTaskButton.addEventListener("click", () => {
        formTask.classList.toggle("new-task-invisible");
      });

      const projectTasksList = project.tasks;

      for (let j = 0; j < projectTasksList.length; j++) {
        const taskDiv = document.createElement("div");
        const taskTitleDiv = document.createElement("div");
        taskTitleDiv.classList.add("task-title-div");
        taskDiv.appendChild(taskTitleDiv);
        taskDiv.classList.add("task-item");
        taskDiv.dataset.index = `${j}`;
        taskTitleDiv.textContent = projectTasksList[j].title;
        taskList.appendChild(taskDiv);
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

        const taskDescriptionDiv = document.createElement("div");
        taskDescriptionDiv.textContent = projectTasksList[j].description;
        taskDescriptionDiv.classList.add("task-description-div");
        taskDiv.insertBefore(taskDescriptionDiv, taskPriorityDiv);

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

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("delete-task-button");
        deleteTaskButton.textContent = "🗑️";
        taskDiv.appendChild(deleteTaskButton);

        const editTaskButton = document.createElement("button");
        editTaskButton.textContent = "✎";
        editTaskButton.classList.add("edit-task-button");
        taskDiv.insertBefore(editTaskButton, deleteTaskButton);
        editTaskButton.addEventListener("click", () => {
          handleEditTaskButton();
        });

        completeTaskButton.addEventListener("click", () => {
          handleChangeStatusButton();
        });

        deleteTaskButton.addEventListener("click", () => {
          handleDeleteTaskButton();
        });

        formTask.addEventListener("submit", (event) => {
          event.preventDefault();
          handleNewTaskFormSubmit();
        });

        function handleChangeStatusButton() {
          const projectToEdit = projectTitleDiv.dataset.index;
          const taskToEdit = parseInt(taskDiv.dataset.index);
          changeTaskStatus(projectToEdit, taskToEdit);
          taskDiv.classList.toggle("complete-task");
          if (taskDiv.className === "task-item complete-task") {
            completeTaskButton.textContent = "✔️";
          } else {
            completeTaskButton.textContent = "⬜";
          }
        }

        function handleNewTaskFormSubmit() {
          const taskTitle = document.querySelector(".task-title").value;
          const taskDescription =
            document.querySelector(".task-description").value;
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
              projectTitleDiv.dataset.index
            );

            for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = "";
            }
            formTask.classList.add("new-task-invisible");
            updateTaskList();
          }
        }

        function handleDeleteTaskButton() {
          const taskToDelete = taskDiv.dataset.index;
          const projectToModify = projectTitleDiv;
          deleteTask(projectToModify.dataset.index, parseInt(taskToDelete));
          updateTaskList();
        }

        function handleEditTaskButton() {
          editTaskButton.style.display = "none";
          const taskToEdit = taskDiv.dataset.index;
          taskTitleDiv.textContent = "";
          taskDescriptionDiv.textContent = "";
          taskPriorityDiv.textContent = "";
          taskDueDateDiv.textContent = "";

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

          newTaskTitleInput.value = projectTasksList[j].title;
          newTaskDescriptionInput.value = projectTasksList[j].description;
          newTaskPrioritySelect.value = projectTasksList[j].priority;
          newTaskDueDateInput.value = projectTasksList[j].dueDate;

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

          taskEditForm.addEventListener("submit", (event) => {
            event.preventDefault();
            editTask(
              projectTitleDiv.dataset.index,
              taskToEdit,
              newTaskTitleInput.value,
              newTaskDescriptionInput.value,
              newTaskPrioritySelect.value,
              newTaskDueDateInput.value
            );
            updateTaskList();
          });
        }
      }
    }
    // displayTaskList(0);
  }
}
