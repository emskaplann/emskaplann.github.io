export default class ItemService {
  constructor(component) {
    this.component = component
  }

  createNewItem = (checklistId, item) => {
    fetch(`https://arcane-sands-50858.herokuapp.com/checklists/${checklistId}/items`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        "Authorization": this.component.props.authProps.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        item
      })
    })
      .then(response => response.json())
      .then(newItem => {
        const oldChecklist = this.component.state.checklists.find(list => list.id === checklistId)
        const newChecklist = Object.assign({}, oldChecklist)
        newChecklist.items = [...newChecklist.items, newItem]
        this.component.updateChecklistsWith(newChecklist)
      })
  }

  completeItem = (itemId, bool, checklistId) => {
    fetch(`https://arcane-sands-50858.herokuapp.com/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }, body: JSON.stringify({
        item: {
          is_completed: bool
        }
      })
    })
      .then(r => r.json())
      .then(editedItem => {
        const oldChecklist = this.component.state.checklists.find(list => list.id === checklistId)
        const newChecklist = Object.assign({}, oldChecklist)
        newChecklist.items = newChecklist.items.map(item => editedItem.id === item.id ? editedItem : item)
        this.component.updateChecklistsWith(newChecklist)
      })
  }

  deleteItem = (itemId, checklistId) => {
    fetch(`https://arcane-sands-50858.herokuapp.com/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": this.component.props.authProps.token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(item => {
        const oldChecklist = this.component.state.checklists.find(list => list.id === checklistId)
        const newChecklist = Object.assign({}, oldChecklist)
        newChecklist.items = newChecklist.items.filter(oldItem => oldItem.id !== item.id)
        this.component.setState({
          checklists: this.component.state.checklists.map(list => list.id === newChecklist.id ? newChecklist : list)
        })
      })
  }

}
