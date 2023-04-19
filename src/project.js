export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }
}

const allProjects = new Project("All");
const workProjects = new Project("Work");
const studyProjects = new Project("Study");
const leisureProjects = new Project("Leisure");

export let myProjectsList = [
  allProjects,
  workProjects,
  studyProjects,
  leisureProjects,
];

export function addNewProject(title) {
  const project = new Project(title);
  myProjectsList.push(project);
}
