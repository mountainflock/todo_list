import Project from "./project";

export default class Task extends Project {
  constructor(projectTitle, title, description, dueDate, priority, isComplete) {
    super(projectTitle);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }
}

const task1 = new Task(
  "Home",
  "Do laundry",
  "Black and color",
  "04/21",
  "Medium",
  false
);
const task2 = new Task(
  "Work",
  "Delete unecessary mail",
  "Filter inboxes",
  "04/30",
  "Medium",
  false
);
const task3 = new Task(
  "Study",
  "Finish JS Course",
  "Odin",
  "05/31",
  "High",
  false
);
const task4 = new Task(
  "Leisure",
  "Watch Loro film",
  "On the TV screen",
  "05/01",
  "Low",
  false
);

export let myTasksList = [task1, task2, task3, task4];

export function addNewTask(
  projectTitle,
  title,
  description,
  dueDate,
  priority,
  isComplete
) {
  const taskItem = new Task(
    projectTitle,
    title,
    description,
    dueDate,
    priority,
    isComplete
  );
  myTasksList.push(taskItem);
}

export function changeTaskStatus(task) {
  if (task.isComplete === true) {
    task.isComplete = false;
  } else {
    task.isComplete = true;
  }
}

export function removeTask(task) {
  myTasksList = myTasksList.filter(function (tasks) {
    return tasks !== myTasksList[task];
  });
}
