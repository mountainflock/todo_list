import "./style.css";
import "date-fns";

displayAllTodos();
displayProjectsList();

function removeProject(project) {
  myProjectsList = myProjectsList.filter(function (projects) {
    return projects !== myProjectsList[project];
  });
}
