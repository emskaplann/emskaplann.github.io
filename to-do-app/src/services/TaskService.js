class TaskService {
  constructor(component) {
    this.component = component
    this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    // this.workingURL = 'http://localhost:3000'
  }

  fetchAllTasksFor = (projectId) => {
    fetch(`${this.workingURL}/projects/${projectId}/tasks`, {
      headers: {
        "Authorization": this.component.props.authProps.token
      }
    })
      .then(response => response.json())
      .then(tasks => this.component.setState({ tasks }))
  }

  completeTask = (taskId) => {
    fetch(`${this.workingURL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify({
        task: {
          is_completed: true
        }
      })
    })
      .then(r => r.json())
      .then(editedTask => {
        const project = this.component.state.projects.find(project => project.id === editedTask.project_id)
        const projectCopy = Object.assign({}, project)
        projectCopy.tasks = projectCopy.tasks.map(task => task.id === editedTask.id ? editedTask : task)
        const newProjects = this.component.state.projects.map(project => project.id === projectCopy.id ? projectCopy : project)
        this.component.setState({
          projects: newProjects,
          allTasks: newProjects.map(project => project.tasks).flat()
        })
      })
  }
}

export default TaskService
