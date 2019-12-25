export default class ProjectService {
  constructor(component) {
    this.component = component
    this.productionURL = 'https://arcane-sands-50858.herokuapp.com'
    this.devURL = 'http://localhost:3000'
  }

  fetchProjects = (userId) => {
    fetch(`${this.productionURL}/users/${userId}/projects`, {
      headers: {
        "Authorization": this.component.props.authProps.token
      }
    }).then(response => {
      if (response.status > 199 && response.status < 300) return response.json()
      throw response.statusText
    }).then(projects => {
      const allTasks = projects.map(project => project.tasks).flat()
      this.component.setState({ projects, allTasks })
    }).catch(reason => console.log(reason))
  }

  postProject = (project) => {
    fetch(`${this.productionURL}/users/${project.userId}/projects`, {
      method: "POST",
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify(project)
    })
      .then(r => r.json())
      .then(newProject => this.component.setState({ projects: [...this.component.state.projects, newProject] }))
  }

  postTask = (task) => {
    fetch(`${this.productionURL}/projects/${task.projectId}/tasks`, {
      method: "POST",
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify(task)
    })
      .then(r => r.json())
      .then(newTask => {
        const project = this.component.state.projects.find(project => project.id === newTask.project_id)
        const projectCopy = Object.assign({}, project)
        projectCopy.tasks = [...projectCopy.tasks, newTask]
        const newProjects = this.component.state.projects.map(project => project.id === projectCopy.id ? projectCopy : project)
        this.component.setState({
          projects: newProjects,
          allTasks: newProjects.map(project => project.tasks).flat(),
        })
      })
  }

  updateProject = (id, project) => {
    fetch(`${this.productionURL}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify({ project })
    })
      .then(r => r.json())
      .then(updatedProject =>
        this.component.setState({
          projects: this.component.state.projects.map(proj => proj.id === updatedProject.id ? updatedProject : proj)
        }))
  }
}
