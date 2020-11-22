const URL_GITHUB_API_MY_REPO = "https://api.github.com/users/brunocesarr/repos";

let items;
let itemCount;
let nextItem;
let previousItem;
let errorApi;
let loadingApi;
let count = 0;
let projects = [];

const showNextItem = () => {
  items[count].classList.remove('active');

  if (count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
}

const showPreviousItem = () => {
  items[count].classList.remove('active');

  if (count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
}

const keyPress = (e) => {
  e = e || window.event;

  if (e.keyCode == '37') {
    showPreviousItem();
  } else if (e.keyCode == '39') {
    showNextItem();
  }
}

const getProjectsGitHub = async () => {
  try {
    if (projects.length === 0) {
      const res = await fetch(URL_GITHUB_API_MY_REPO);
      const data = await res.json();
      projects = data
        .map(project => {
          return {
            name: project.name.toUpperCase().replace(/[._-]/g, " "),
            description: project.description,
            url: project.html_url,
            languages: project.language,
            license: project.license?.name,
            created_at: new Date(project.created_at)
          }
        })
        .sort((projectA, projectB) => {
          projectA.created_at - projectB.created_at
        })
        .reverse();
    }

    return projects;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

const createPageProjects = (projects) => {
  let htmlPageProject = "";
  let projectsHTML = [];
  let div_project = "";

  let pagesCount = Math.ceil(projects.length / 6);

  projects.forEach((project, index) => {
    div_project += `
      <div class="col-xl-4 col-md-6 col-sm-12 mb-2">
        <div class="card-ui card shadow">
          <div class="card-ui-front">
            <img src="../assets/images/github-white.png" width="40%" />
            <div class="card-body project-title">
              <h5 class="card-title mb-0 text-white">${project.name}</h5>
            </div>
          </div>
          <div class="card-ui-back">
            <h5 class="card-title mb-0 text-white">${project.name}</h5>
            <div class="card-text text-white-50">${ 
              project.description
              ? project.description
              : (project.languages)
                ? "Projeto desenvolvido em " + project.languages
                : "Projeto desenvolvido."
              }
            </div>
            <div class="text-white d-flex align-items-center justify-content-center">
              
              <a target="_blank"
              href="${project.url}" data-toggle="tooltip" data-placement="top"
              title="Visitar o repositório">
              <i class="fas fa-code-branch"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    if ((index + 1) % pagesCount === 0) {
      projectsHTML.push(div_project);
      div_project = "";
    }
  });

  projectsHTML.forEach((projectHTML, index) => {
    const pageProjects = `
      <div class="row justify-content-center page-project ${index === 0 ? 'active' : ''}" id="page-${index}">
        ${projectHTML}
      </div>
    `;

    htmlPageProject += pageProjects;
  });

  return htmlPageProject;
}

const createPagePagination = () => {
  return `
    <nav class="row d-flex justify-content-center align-items-start mt-3">
      <button class="previous">
        <span>
          <i class="fas fa-arrow-left"></i>
        </span>
      </button>
      <button class="next">
        <span>
          <i class="fas fa-arrow-right"></i>
        </span>
      </button>
    </nav>
  `;
}

const addActionsInButtons = () => {
  try {
    items = document.querySelectorAll('div.page-project');
    itemCount = items.length;
    nextItem = document.querySelector('.next');
    previousItem = document.querySelector('.previous');

    if (!nextItem || !previousItem || !items)
      throw new Error('Variável nula ou carregamento incompleto.');

    nextItem.addEventListener('click', showNextItem);
    previousItem.addEventListener('click', showPreviousItem);
    document.addEventListener('keydown', keyPress);
  } catch (error) {
    console.error('Error: ', error.message);
    throw error;
  }
}

const renderProjects = async () => {
  try {
    const projects = await getProjectsGitHub();

    let PROJECTS_HTML = "";

    PROJECTS_HTML += createPageProjects(projects);

    PROJECTS_HTML += createPagePagination();

    $("#projects-github").html(PROJECTS_HTML);

    addActionsInButtons();
  } catch (error) {
    alert('Não foi possível buscar os projetos! Recarregando a página...');
    console.error(error)
    location.reload(true);
  }
}

window.onload = function () {
  errorApi = document.querySelector("#error-api");
  loadingApi = document.querySelector("#loading-api");
  renderProjects();
};