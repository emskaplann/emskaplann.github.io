import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService.js'
import TaskService from '../../services/TaskService.js'
import DashBoard from './DashBoard'
import Projects from './Projects'

export class MainViewRenderProps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loggedInUserId: null,
      projects: [],
      allTasks: [],
    }
    this.projectService = new ProjectService(this)
    this.taskService = new TaskService(this)
  }

  componentDidMount() {
    this.projectService.fetchProjects(this.props.authProps.loggedInUserId)
  }

  findProjectWith = (id) => this.state.projects.find(project => project.id === parseInt(id))

  handleTaskSubmit = obj => this.projectService.postTask(obj)

  render() {
    switch (this.props.children) {
      case DashBoard:
        return <this.props.children allTasks={this.state.allTasks} projects={this.state.projects} projectService={this.projectService} taskService={this.taskService} authProps={this.props.authProps} />
      case Projects:
        return <this.props.children projectService={this.projectService} taskService={this.taskService} project={this.findProjectWith(this.props.id)} authProps={this.props.authProps} handleTaskSubmit={this.handleTaskSubmit} />
      default:
        return <this.props.children tasks={this.state.allTasks} taskService={this.taskService} projects={this.state.projects} handleTaskSubmit={this.handleTaskSubmit} authProps={this.props.authProps} />
    }
  }
}

export default MainViewRenderProps;

{/* <DashBoard projectService={this.projectService} taskService={this.taskService} projects={this.state.projects} authProps={this.authProps()} /> */ }
{/* <Projects project={this.findProjectWith(useParams().id)} handleTaskSubmit={this.handleTaskSubmit} authProps={this.authProps()} /> */ }
{/* <Tasks tasks={this.state.allTasks} projects={this.state.projects} handleTaskSubmit={this.handleTaskSubmit} authProps={this.authProps()} /> */ }