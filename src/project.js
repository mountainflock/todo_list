export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }
}

const workProjects = new Project("Work");
const studyProjects = new Project("Study");
const leisureProjects = new Project("Leisure");

export let myProjectsList = [workProjects, studyProjects, leisureProjects];

export function addNewProject(title) {
  const project = new Project(title);
  myProjectsList.push(project);
}

export function removeProject(project) {
  myProjectsList = myProjectsList.filter(function (projects) {
    return projects !== myProjectsList[project];
  });
}
