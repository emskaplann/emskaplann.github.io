import React, { useState } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap/'

const handleSubmit = (isEditing, name, description, projectService, project) => {
  projectService.updateProject(project.id, { name, description })
  isEditing(false)
}

const ProjectTitleComponent = ({ project, className, projectService }) => {
  const [editing, isEditing] = useState(false)
  const [name, setName] = useState(project.name)
  const [desc, setDesc] = useState(project.desc)
  return (
    <Card className={className + ' d-flex'}>
      <Card.Header style={{ backgroundColor: '#0099FF', color: "#fff" }}>
        <Row>
          <Col sm={10} className='my-auto' >
            {editing ? <Form.Control value={name} placeholder={project.name} onChange={(e) => setName(e.target.value)} /> : project.name /* {project.name}<i className="fa fa-fw fa-square" style={{ fontSize: '1em', marginLeft: 5 }} /> */}
          </Col>
          <Col sm={2} className='text-right'>
            <div variant='light' onClick={() => !editing ? isEditing(true) : handleSubmit(isEditing, name, desc, projectService, project)}>
              <strong>{editing ? 'Done' : 'Edit'}</strong><i className={!editing ? "fa fa-fw fa-pencil" : "fa fa-fw fa-check"} style={{ fontSize: '1em', marginLeft: 5 }} />
            </div>
          </Col>
        </Row>

      </Card.Header>
      <Card.Body>
        {editing ? <Form.Control value={desc} placeholder={project.description} onChange={(e) => setDesc(e.target.value)} /> : project.description}
      </Card.Body>
    </Card>
  )
}

export default ProjectTitleComponent
