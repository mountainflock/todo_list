import { demoTodoList } from "./demoTodoList";

const savedTodoList = JSON.parse(localStorage.getItem("todoList"));

export let todoList = savedTodoList || demoTodoList;

export function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

export function addNewTask(
  title,
  description,
  priority,
  dueDate,
  isComplete,
  project
) {
  const task = { title, description, priority, dueDate, isComplete };
  todoList[project].tasks.push(task);
  saveTodoList();
}

export function addNewProject(title) {
  const project = { title, tasks: [] };
  todoList.push(project);
  saveTodoList();
}

export function deleteProject(project) {
  todoList = todoList.filter((projects) => projects !== todoList[project]);
  saveTodoList();
}

export function deleteTask(project, task) {
  todoList[project].tasks = todoList[project].tasks.filter(
    (tasks) => tasks !== todoList[project].tasks[task]
  );
  saveTodoList();
}

export function changeTaskStatus(project, task) {
  const taskToStatusChange = todoList[project].tasks[task];
  if (taskToStatusChange.isComplete === true) {
    taskToStatusChange.isComplete = false;
  } else {
    taskToStatusChange.isComplete = true;
  }
  saveTodoList();
}

export function renameProject(project, newTitle) {
  todoList[project].title = newTitle;
  saveTodoList();
}

export function editTask(
  project,
  task,
  newTitle,
  newDescription,
  newPriority,
  newDueDate
) {
  const taskToEdit = todoList[project].tasks[task];
  taskToEdit.title = newTitle;
  taskToEdit.description = newDescription;
  taskToEdit.priority = newPriority;
  taskToEdit.dueDate = newDueDate;
  saveTodoList();
}
