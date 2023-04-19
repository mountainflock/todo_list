import Project from "./project";

export default class Task extends Project {
  constructor(projectTitle, title, description, dueDate, priority) {
    super(projectTitle);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const task1 = new Task(
  "Home",
  "Do laundry",
  "Black and color",
  "04/21",
  "Medium"
);
const task2 = new Task(
  "Work",
  "Delete unecessary mail",
  "Filter inboxes",
  "04/30",
  "Medium"
);
const task3 = new Task("Study", "Finish JS Course", "Odin", "05/31", "High");
const task4 = new Task(
  "Leisure",
  "Watch Loro film",
  "On the TV screen",
  "05/01",
  "Low"
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

export function removeTask(task) {
  myTasksList = myTasksList.filter(function (tasks) {
    return tasks !== myTasksList[task];
  });
}
