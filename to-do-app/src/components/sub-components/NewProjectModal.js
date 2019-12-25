import React from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"


export default class NewProjectModal extends React.Component {
  state = {
    show: this.props.show,
    project: {
      date: "",
      description: "",
      name: "",
      priority: "",
    }
  }

  handleName = name => this.setState({ project: { ...this.state.project, name: name } })
  handleDesc = description => this.setState({ project: { ...this.state.project, description: description } })
  handleChange = date => this.setState({ project: { ...this.state.project, date: date } })
  handleSelectChange = priority => this.setState({ project: { ...this.state.project, priority: priority } })

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Enter New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formProName">
              <Form.Label column sm="2">
                <small>Name:</small>
              </Form.Label>
              <Col sm="10">
                <Form.Control onChange={(event) => this.handleName(event.target.value)} value={this.state.project.name} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formProDesc">
              <Form.Label column sm="2">
                <small>Description:</small>
              </Form.Label>
              <Col sm="10">
                <Form.Control onChange={(event) => this.handleDesc(event.target.value)} value={this.state.project.description} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formProPriority">
              <Col sm='2'>
                <Form.Label><small>Priority:</small></Form.Label>
              </Col>
              <Col sm='10'>
                <Form.Control as="select" onChange={(event) => this.handleSelectChange(event.target.value)}>
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formProDeadline">
              <Col sm='2'>
                <Form.Label>
                  <small>Deadline:</small>
                </Form.Label>
              </Col>
              <Col sm='10'>
                <DatePicker
                  selected={this.state.project.date}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button size='sm' variant="secondary" onClick={this.props.handleModalClose}>Close</Button>
          <Button size='sm' onClick={(event) => this.props.handleProjectSubmit(this.state.project)} variant="primary">Create Project</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
