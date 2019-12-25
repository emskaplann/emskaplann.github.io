import React from 'react';
import { Card, ListGroup } from 'react-bootstrap'
import TaskModal from './TaskModal.js'
import ChecklistService from '../../services/ChecklistService.js'
import ItemService from '../../services/ItemService.js';


class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalHidden: true,
      task: { id: 1 },
      checklists: [],
    }
    this.ChecklistService = new ChecklistService(this)
    this.itemService = new ItemService(this)
  }

  closeModal = () => this.setState({ isModalHidden: true })

  updateChecklistsWith = (checklist) => {
    this.setState({
      checklists: this.state.checklists.map(list => list.id === checklist.id ? checklist : list)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true
    return false
  }

  openModal = (task) => {
    this.ChecklistService.fetchChecklists(task.id)
    this.setState({ isModalHidden: false, task: task })
  }

  render() {
    const { title, tasks, openModal, style, completeTask } = this.props
    return (
      <Card className='mb-2' >
        <TaskModal itemService={this.itemService} checklistService={this.ChecklistService} authProps={this.props.authProps} task={this.state.task} show={!this.state.isModalHidden} checklists={this.state.checklists} closeModal={this.closeModal} />
        <Card.Header style={style}>
          <div className="float-left">
            {title} <i className="fa fa-fw fa-th" style={{ fontSize: '1em', marginLeft: 5 }} />
          </div>
          {title !== "Completed Tasks" ?
            <div className="float-right" onClick={openModal}>
              <strong>New</strong><i className="fa fa-fw fa-plus-square" style={{ fontSize: '1em', marginLeft: 5 }} />
            </div>
            : null
          }
        </Card.Header>
        <Card.Body>
          {
            tasks.map(task =>
              <div key={`task-item${task.id}`}>
                <ListGroup.Item key={`task-item-${task.id}`} className='d-flex' >
                  <span className='flex-grow-1' onClick={() => this.openModal(task)}>
                    {task.title}
                  </span>
                  <span>
                    {title === "Upcoming Tasks" ? <i onClick={() => completeTask(task.id)} className="fa fa-fw fa-check" style={{ fontSize: '1.5em', color: '#d3d3d3', marginLeft: 3 }} /> : null}
                    {/* {title === "All Tasks" ? <i onClick={() => completeTask(task.id)} className="fa fa-fw fa-check" style={{ fontSize: '1.5em', color: `${task.is_completed ? 'green' : '#d3d3d3'}`, marginLeft: 3 }} /> : null} */}

                  </span>
                </ListGroup.Item>
              </div>
            )
          }
        </Card.Body>
      </Card>
    )
  }
}

export default AllTasks;

// style={{ width: '850px' }}
