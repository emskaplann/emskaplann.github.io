class NoteService {
  constructor(component) {
    this.component = component
    this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    // this.workingURL = 'http://localhost:3000'

  }

  fetchNotesForProject = (projectId) => {
    fetch(`${this.workingURL}/projects/${projectId}/notes`, {
      headers: {
        "Authorization": this.component.props.authProps.token
      }
    })
      .then(response => response.json())
      .then(notes => this.component.setState({ notes }))
  }

  createNote = (note, projectId) => {
    fetch(`${this.workingURL}/projects/${projectId}/notes`, {
      headers: {
        "Authorization": this.component.props.authProps.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(note),
      method: 'POST'
    })
      .then(response => response.json())
      .then(note => {
        this.component.setState({
          notes: [...this.component.state.notes, note]
        })
      })
  }

  deleteNote = (noteId) => {
    fetch(`${this.workingURL}/notes/${noteId}`, { //eslint-disable-line 
      method: 'DELETE',
      headers: {
        "Authorization": this.component.props.authProps.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
    })
      .then(response => response.json())
      .then(deletedNote => {
        const notes = this.component.state.notes
        this.component.setState({
          notes: notes.filter(note => note.id !== deletedNote.id)
        })
      })
  }
}

export default NoteService
