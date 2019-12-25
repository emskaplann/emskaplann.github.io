import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const prosInRows = (pros) => {
  const size = 3
  const arrayOfArrays = []
  for (var i = 0; i < pros.length; i += size) {
    arrayOfArrays.push(pros.slice(i, i + size))
  }
  return arrayOfArrays
}

const renderRows = (projects) => {
  return prosInRows(projects).map((row, index) => renderRow(row, index))
}

const renderRow = (row, index) => (
  <div className='row mx-auto' key={`row-${index}`} style={{ marginTop: 10 }}>
    {row.map(project =>
      <Col key={`project-${project.id}`} sm={4}>
        <Link to={`/projects/${project.id}`}>
          <Card key={`project-${project.id}`}>
            <Card.Header style={{color: '#000000'}}>
              {project.name}
            </Card.Header>
          </Card>
        </Link>
      </Col>
    )}
  </div>
)

const ProjectCardsComponent = ({ projects, openModal }) => {
  return (
    <Card className='mb-3'>
      <Card.Header style={{ backgroundColor: '#0099FF', color: "#fff" }}>
        <div className='float-left'>
          My Projects <i className="fa fa-fw fa-th-large" style={{ fontSize: '1em', marginLeft: 5 }} />
        </div>
        <div className='float-right' onClick={() => openModal()}>
          <strong>New</strong><i className="fa fa-fw fa-plus-square" style={{ fontSize: '1em', marginLeft: 5 }} />
        </div>
      </Card.Header>
      <Card.Body>
        {renderRows(projects)}
      </Card.Body>
    </Card>
  )
}

export default ProjectCardsComponent
