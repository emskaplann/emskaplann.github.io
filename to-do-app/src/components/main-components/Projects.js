import React from 'react';
import { Container, Col, Row } from 'react-bootstrap/';
import TagSerivce from '../../services/TagService';
import ProjectTitleComponent from '../sub-components/ProjectTitleComponent';
import NotesCard from '../sub-components/NotesCard';
import AllTasks from '../sub-components/AllTasks'
import NewTaskModal from '../sub-components/NewTaskModal.js'

export default class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      showNTM: false
    }
    this.tagService = new TagSerivce(this)
  }

  openOrCloseModal = () => this.setState({ showNTM: !this.state.showNTM })

  completeTask = (taskId) => {
    this.props.taskService.completeTask(taskId)
  }

  render() {
    console.log(this.props)
    const { project } = this.props
    if (!project) return null
    const tasks = project.tasks.filter(task => !task.is_completed)
    const completedTasks = project.tasks.filter(task => task.is_completed)
    return (
      <Container fluid>
        <NewTaskModal show={this.state.showNTM} closeModal={this.openOrCloseModal} project={this.props.project} handleTaskSubmit={this.props.handleTaskSubmit} />
        <Row className='w-100'>
          <Col sm={7}>
            <ProjectTitleComponent projectService={this.props.projectService} project={project} className='mb-3' />
            <NotesCard authProps={this.props.authProps} className='mb-3' project={project} openModal={this.openOrCloseModal} />
          </Col>
          <Col sm={5}>
            {/* need to send in checklist service and item service from app.js  */}
            <AllTasks key={`length-of-tasks-${tasks.length}`} completeTask={this.completeTask} authProps={this.props.authProps} title='Upcoming Tasks' tasks={tasks} style={{ backgroundColor: '#4d1411', color: "#fff" }} openModal={this.openOrCloseModal} />
            <AllTasks key={`length-of-completedTasks-${completedTasks.length}`} authProps={this.props.authProps} title='Completed Tasks' tasks={completedTasks} style={{ backgroundColor: '#669900', color: "#fff" }} />
          </Col>
        </Row>
      </Container>
    )
  }
}
