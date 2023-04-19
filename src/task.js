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
  "21.04.2022",
  "Medium"
);
const task2 = new Task(
  "Work",
  "Delete unecessary mail",
  "Filter inboxes",
  "31.04.2023"
);
const task3 = new Task("Study", "Finish JS Course", "Odin", "31.05.2023");
const task4 = new Task(
  "Leisure",
  "Watch Loro film",
  "On the TV screen",
  "20.04.2023"
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

function changeStatus(task) {
  if (myTasksList[task].isComplete === true) {
    myTasksList[task].isComplete = false;
  } else {
    myTasksList[task].isComplete = true;
  }
  todoList.textContent = "";
  displayAllTodos();
}

function removeTodo(task) {
  myTasksList = myTasksList.filter(function (tasks) {
    return tasks !== myTasksList[task];
  });
}
