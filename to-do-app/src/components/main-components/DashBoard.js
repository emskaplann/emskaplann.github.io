import React from 'react'
import Calendar from 'react-calendar'
import NewProjectModal from '../sub-components/NewProjectModal.js'
import UpcomingTasks from '../sub-components/UpcomingTasks.js'
import RecentlyCompletedTasks from '../sub-components/RecentlyCompletedTasks.js'
import ProjectCardsComponent from '../sub-components/ProjectCardsComponent'
import { Container, Row, Col } from 'react-bootstrap'

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 1,
      showNPM: false,
      date: new Date(),
      inbox: [],
      trash: [],
      upcomingTasks: []
    }
  }

  onChange = date => this.setState({ date })
  openModal = () => this.setState({ showNPM: true })
  handleModalClose = () => this.setState({ showNPM: false })
  allTasks = () => this.props.allTasks

  handleProjectSubmit = (obj) => {
    let newObj = { ...obj, userId: this.props.authProps.loggedInUserId }
    this.props.projectService.postProject(newObj)
    this.setState({ showNPM: false })
  }

  completeTask = (taskId) => this.props.taskService.completeTask(taskId)

  render() {
    return (
      <Container fluid>
        <NewProjectModal handleProjectSubmit={this.handleProjectSubmit} show={this.state.showNPM} handleModalClose={this.handleModalClose} />
        <Row>
          <Col sm={3}>
            <Calendar className='mb-3' onChange={this.onChange} value={this.state.date} />
          </Col>
          <Col sm={6}>
            <ProjectCardsComponent projects={this.props.projects} openModal={this.openModal} />
            <UpcomingTasks dateFromState={this.state.date} tasks={this.allTasks().filter(task => !task.is_completed)} completeTask={this.completeTask} />
          </Col>
          <Col sm={3}>
            <RecentlyCompletedTasks tasks={this.allTasks()} completeTask={this.completeTask} />
          </Col>
        </Row>
      </Container>
    )
  }
}

// <Accordion defaultActiveKey="0">
//   <Card style={{ width: '100%', maxWidth: '100%' }}>
//     <Card.Header style={{ backgroundColor: '#990033', color: '#fff' }}>
//       Inbox <i className="fa fa-fw fa-inbox" style={{ fontSize: '1em', marginLeft: 5 }} />
//     </Card.Header>
//     <ListGroup.Item>Inbox !</ListGroup.Item>
//     <Card.Header style={{ backgroundColor: '#666666', color: '#fff' }}>
//       <CustomToggle eventkey="1" color='#666666'>
//         Trash <i className="fa fa-fw fa-trash" style={{ fontSize: '1em', marginLeft: 5 }} />
//       </CustomToggle>
//     </Card.Header>
//     <Accordion.Collapse eventkey="1">
//       <ListGroup.Item>Trash HERE!</ListGroup.Item>
//     </Accordion.Collapse>
//     <Card.Header style={{ backgroundColor: '#990033', color: '#fff' }}>
//       Upcoming Deadlines <i className="fa fa-fw fa-hourglass-end" style={{ fontSize: '1em', marginLeft: 5 }} />
//     </Card.Header>
//     <ListGroup.Item>Deadlines 1</ListGroup.Item>
//     <ListGroup.Item>Deadlines 2</ListGroup.Item>
//     <ListGroup.Item>Deadlines 3</ListGroup.Item>
//     <ListGroup.Item>Deadlines 4</ListGroup.Item>
//   </Card>
// </Accordion>
