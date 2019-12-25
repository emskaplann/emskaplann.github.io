import React from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import Checklist from './Checklist.js'

export default class TaskModal extends React.Component {
  state = {
    newList: false,
    title: ''
  }
  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleClick = () => this.setState({ newList: !this.state.newList })

  handleSubmit = (event) => {
    this.props.checklistService.createChecklist(this.props.task.id, { title: this.state.title })
    this.setState({ title: '', newList: false })
  }

  renderForm = () => {
    const { title } = this.state
    return (
      <Form className='pt-1 pb-4 pl-2'>
        <Row>
          <Col sm='7'>
            <Form.Control placeholder='title' name='title' value={title} onChange={this.handleChange} />
          </Col>
          <Col sm='2'>
            <Button onClick={this.handleSubmit} >
              Submit
            </Button>
          </Col>
          <Col sm='2'>
            <Button variant="danger" onClick={() => this.setState({ newList: false })}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <div className='float-left' style={{ color: "black" }}>
            {this.props.task.title}
          </div>
          <div className='float-right'>
            <i onClick={event => this.handleClick()} className="fa fa-fw fa-plus-square" style={{ fontSize: '1.5em', marginLeft: 5 }} />
            <i onClick={() => this.props.closeModal()} className="fa fa-fw fa-times-circle" style={{ fontSize: '1.5em' }} />
          </div>
        </Modal.Header>
        <Modal.Body>
          {this.state.newList ? this.renderForm() : null}
          {this.props.checklists.map(checklist => <Checklist authProps={this.props.authProps} itemService={this.props.itemService} checklist={checklist} key={checklist.id} />)}
        </Modal.Body>
      </Modal>
    )
  }
}
