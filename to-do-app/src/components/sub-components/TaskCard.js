import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap/'
import TaskService from '../../services/TaskService';


export class TaskCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
    this.taskSerivce = new TaskService(this)
  }

  componentDidMount() {
    this.taskSerivce.fetchAllTasksFor(this.props.project.id)
  }
  render() {
    const { className } = this.props
    return (
      <Card className={className}>
        <Card.Header style={{ backgroundColor: '#0033CC', color: "#fff" }}>
          Tasks <i className="fa fa-fw fa-tasks" style={{ fontSize: '1em', marginLeft: 5 }} />
        </Card.Header>
        <Card.Body>
          {this.state.tasks.map(task => (
            <ListGroup.Item key={`task-item${task.id}`} style={{ border: '1px solid #d3d3d3' }}>{task.title}</ListGroup.Item>
          ))}
        </Card.Body>
      </Card>
    )
  }
}

export default TaskCard
