import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default class SingleItem extends React.Component {
  // constructor(props) {
  //   super();
  //   // this.state = {
  //   //   isCompleted: props.is_completed
  //   // }
  //   // this.itemService = new ItemService(this)
  // }

  completeItem = (itemId) => {
    this.props.itemService.completeItem(itemId, !this.props.item.is_completed, this.props.checklistId)
  }

  render() {
    return (
      <div>
        <Card.Body key={`checklist-item${this.props.item.id}`}>
          <ListGroup.Item key={this.props.item.id}>
            <div className='float-left'>
              <i onClick={() => this.completeItem(this.props.item.id)} className="fa fa-fw fa-check" style={{ fontSize: '1.5em', color: !this.props.item.is_completed ? 'silver' : 'green' }} />

              {this.props.item.text}
            </div>
            <div className='float-right'>
              <i className="fa fa-fw fa-trash" style={{ fontSize: '1.25em', color: 'darkGray' }} onClick={() => this.props.deleteItem(this.props.item.id)} />
            </div>
            <br />
          </ListGroup.Item>
        </Card.Body>
      </div>
    )
  }
}
