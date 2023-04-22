export let todoList = [];

class Task {
  constructor(title, description, priority, dueDate, isComplete) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.isComplete = isComplete;
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }
}

export function addNewTask(
  title,
  description,
  priority,
  dueDate,
  isComplete,
  index
) {
  const task = new Task(title, description, priority, dueDate, isComplete);
  todoList[index].tasks.push(task);
}

export function addNewProject(title) {
  const project = new Project(title);
  todoList.push(project);
}

export function deleteProject(project) {
  todoList = todoList.filter((projects) => projects !== todoList[project]);
}

export function deleteTask(project, task) {
  todoList[project].tasks = todoList[project].tasks.filter(
    (tasks) => tasks !== todoList[project].tasks[task]
  );
}

export function changeTaskStatus(project, task) {
  if (todoList[project].tasks[task].isComplete === true) {
    todoList[project].tasks[task].isComplete = false;
  } else {
    todoList[project].tasks[task].isComplete = true;
  }
}

addNewProject("Work");
addNewProject("Study");
addNewProject("Home");
addNewProject("Leisure");

addNewTask("Check the mailbox", "Spam too", "Medium", "04/30", false, 0);
addNewTask("Apply project", "Check the new ones", "High", "04/25", false, 0);
addNewTask("Call Julia", "Ask about the report", "High", "04/22", true, 0);
addNewTask("Make vacation plans", "Call the manager", "Low", "09/09", false, 0);

addNewTask(
  "Finish the to-do project",
  "Optimise code",
  "High",
  "04/24",
  false,
  1
);
addNewTask("Read the past conspect", "On classes", "Medium", "04/24", true, 1);
addNewTask("Return to validation JS", "Practice", "Medium", "04/26", false, 1);

addNewTask("Do the laundry", "White", "High", "04/23", false, 2);
addNewTask("Mice cleaning", "Water bottle too", "Medium", "04/22", false, 2);
addNewTask("Get the delivery", "20:00 - 22:00", "Low", "04/22", true, 2);
addNewTask(
  "Collect clothes for charity",
  "Check the points",
  "Low",
  "05/25",
  false,
  2
);
addNewTask("Watch Loro film", "On the TV screen", "Medium", "05/01", false, 3);
addNewTask(
  "Watch Napoleon documentary",
  "Finish book first",
  "High",
  "04/23",
  false,
  3
);

// deleteProject("3");
// deleteTask(1, 0);
// deleteTask(1, 0);
// changeTaskStatus(0, 0);

// console.log(todoList[0].tasks[0].isComplete);
// console.log(todoList[0].tasks[0]);
// console.log(todoList.length);
// console.log(todoList[1].tasks.length);
