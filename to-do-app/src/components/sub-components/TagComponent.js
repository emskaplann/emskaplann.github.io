import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap/';

const TagComponent = ({ tags }) => {
  console.log("need to add an onClick in order to add the tag to the project")
  console.log("Add modal to create new tag")

  return (
    <div>
      <Row>
        <Col sm={1.5}>
          <ListGroup.Item style={{ marginRight: 5 }}>Tags:</ListGroup.Item>
        </Col>
        {tags.map(tag => (
          <ListGroup>
            <ListGroup.Item key={`tag-${tag.id}`} style={{ backgroundColor: '#d4c1c2', color: "#fff", border: '0.5px solid #d4c1c2', fontWeight: 'bold' }}>{tag.text}</ListGroup.Item>
          </ListGroup>
        ))}
      </Row>
    </div>
  )
}

export default TagComponent
