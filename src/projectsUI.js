import {
  todoList,
  addNewProject,
  deleteProject,
  renameProject,
} from "./toDoFunctions";

import { updateTaskList } from "./tasksUI";

export function renderPage() {
  displayProjectList();
}

export let activeProject;

const projectList = document.querySelector(".project-list");
const newProjectButton = document.querySelector(".new-project-button");

export function displayProjectList() {
  addNewProjectButton();
  for (let i = 0; i < todoList.length; i++) {
    const projectDiv = document.createElement("div");
    const projectTitleDiv = document.createElement("div");
    projectTitleDiv.classList.add("project-title-div");
    projectDiv.classList.add("project-item");
    projectList.appendChild(projectDiv);
    projectTitleDiv.dataset.index = `${i}`;
    projectDiv.dataset.index = `${i}`;
    projectDiv.appendChild(projectTitleDiv);
    const project = todoList[projectTitleDiv.dataset.index];
    projectTitleDiv.textContent = project.title;
    projectTitleDiv.addEventListener("click", () => {
      activeProject = projectDiv.dataset.index;
      updateProjectList();
      updateTaskList(activeProject);
    });

    addEditProjectButton(projectDiv);
    addDeleteProjectButton(projectDiv);
  }
}

function addEditProjectButton(projectDiv) {
  const editProjectButton = document.createElement("button");
  const editButtonText = document.createElement("span");

  editButtonText.textContent = "edit";
  editButtonText.style.color = "grey";
  editButtonText.classList.add("material-symbols-outlined");
  editProjectButton.appendChild(editButtonText);
  editProjectButton.classList.add("edit-project-button");

  projectDiv.appendChild(editProjectButton);

  editProjectButton.addEventListener("click", () => {
    hanleEditProjectButton(projectDiv.dataset.index);
  });
}

function addDeleteProjectButton(projectDiv) {
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

  projectDiv.appendChild(deleteProjectButton);

  deleteProjectButton.addEventListener("click", () => {
    handleDeleteProjectButton(projectDiv);
  });
}

function hanleEditProjectButton(activeProject) {
  const projectTitleDivs = document.querySelectorAll(".project-title-div");
  const projectTitleDiv = projectTitleDivs[activeProject];

  projectTitleDiv.textContent = "";

  const newProjectTitleForm = document.createElement("form");
  const newProjectTitleInput = document.createElement("input");

  newProjectTitleInput.value = todoList[activeProject].title;
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
    projectTitleDiv.textContent = todoList[activeProject].title;
  });

  newProjectTitleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renameProject(projectTitleDiv.dataset.index, newProjectTitleInput.value);
    updateProjectList();
    updateTaskList(activeProject);
  });
}

function handleDeleteProjectButton(projectDiv) {
  deleteProject(parseInt(projectDiv.dataset.index));
  projectList.removeChild(projectDiv);
  updateProjectList();
}

function addNewProjectButton() {
  const formProject = document.querySelector(".new-project");
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
