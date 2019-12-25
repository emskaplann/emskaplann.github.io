import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap/'
import NoteService from '../../services/NoteService';
import { Button, Form, Col, Row } from 'react-bootstrap'

class NotesCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalHidden: false,
      notes: [],
      text: ''
    }
    this.noteService = new NoteService(this)
  }

  handleSubmit = (note) => {
    this.noteService.createNote(note, this.props.project.id)
    this.openOrCloseModal()
  }

  openOrCloseModal = () => this.setState({ isModalHidden: !this.state.isModalHidden })

  componentDidMount() {
    this.noteService.fetchNotesForProject(this.props.project.id)
  }

  renderForm = () => (
    <Form>
      <Form.Group as={Row} controlId="formProName" className='text-center'>
        <Col sm="9">
          <Form.Control as="textarea" autoFocus={true} onChange={(event) => this.setState({ text: event.target.value })} placeholder="Enter text here..." value={this.state.text} />
        </Col>
        <Col sm="3" className='my-auto'>
          <Button onClick={(event) => this.handleSubmit({ note: { text: this.state.text } })} variant="primary">
            Add Note
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )

  render() {
    const { className } = this.props
    return (
      <Card className={className}>
        {/* <NotesModal show={this.state.isModalHidden} closeModal={this.openOrCloseModal} handleSubmit={this.handleSubmit} /> */}
        <Card.Header style={{ backgroundColor: '#990033', color: '#fff' }}>
          Notes <i className="fa fa-fw fa-pencil-square-o" style={{ fontSize: '1em', marginLeft: 5 }} />
          <div className="float-right" onClick={this.openOrCloseModal}>
            <strong>{!this.state.isModalHidden ? "New" : "Cancel"}</strong><i className="fa fa-fw fa-plus-square" style={{ fontSize: '1em', marginLeft: 5 }} />
          </div>
        </Card.Header>
        <Card.Body>
          {this.state.isModalHidden ? this.renderForm() : null}
          {this.state.notes.map(note => (
            <ListGroup.Item className='d-flex' key={`note-item-${note.id}`} style={{ border: '1px solid #d3d3d3' }}>
              {note.text}
              <span className='flex-fill text-right' onClick={() => this.noteService.deleteNote(note.id)}>
                <i className="fa fa-fw fa-trash" style={{ fontSize: "1.25em", color: "darkgray" }}></i>
              </span>
            </ListGroup.Item>
          ))}
        </Card.Body>
      </Card>
    )
  }

}

export default NotesCard
