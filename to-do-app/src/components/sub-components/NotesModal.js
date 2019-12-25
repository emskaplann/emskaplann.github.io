import React, { Component } from 'react';
import NoteService from '../../services/NoteService';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

export class NotesModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.noteService = new NoteService(this)
  }

  handleSubmit = () => {
    this.props.handleSubmit({ note: this.state })
    this.setState({ text: '' })
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formProName">
              <Col sm="12">
                <Form.Control autoFocus={true} onChange={(event) => this.setState({ text: event.target.value })} placeholder="Enter text here..." value={this.state.text} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant="secondary" onClick={this.props.closeModal}>Close</Button>
          <Button size='sm' onClick={(event) => this.handleSubmit()} variant="primary">Add Note</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// this.props.handleTaskSubmit({note: }this.state.text)

export default NotesModal;
