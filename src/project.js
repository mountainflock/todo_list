export default class Project {
  constructor(projectTitle, tasks) {
    this.projectTitle = projectTitle;
    this.tasks = tasks;
  }
  setProjectTitle(projectTitle) {
    this.projectTitle = projectTitle;
  }

  getProjectTitle() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskTitle) {
    return this.tasks.find((task) => task.Title() === taskTitle);
  }

  contains(taskTitle) {
    return this.tasks.some((task) => task.getTitle() === taskTitle);
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.title)) return;
    this.tasks.push(newTask);
  }

  deleteTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
  }
}

const workProjects = new Project("Work");
const studyProjects = new Project("Study");
const leisureProjects = new Project("Leisure");

export let myProjectsList = [workProjects, studyProjects, leisureProjects];

export function addProject(title) {
  const project = new Project(title);
  myProjectsList.push(project);
}

export function deleteProject(project) {
  myProjectsList = myProjectsList.filter(
    (projects) => projects !== myProjectsList[project]
  );
}
