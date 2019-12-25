export default class ChecklistService {
  constructor(component) {
    this.component = component
  }

  fetchChecklists = taskId => {
    fetch(`https://arcane-sands-50858.herokuapp.com/tasks/${taskId}/checklists`, {
      headers: {
        "Authorization": this.component.props.authProps.token
      }
    })
      .then(r => r.json())
      .then(checklists => {
        this.component.setState({ checklists })
      })
  }

  createChecklist = (taskId, checklist) => {
    fetch(`https://arcane-sands-50858.herokuapp.com/tasks/${taskId}/checklists`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        "Authorization": this.component.props.authProps.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        checklist
      })
    })
      .then(response => response.json())
      .then(checklist => {
        this.component.setState({
          checklists: [...this.component.state.checklists, checklist]
        })
      })
  }

}
