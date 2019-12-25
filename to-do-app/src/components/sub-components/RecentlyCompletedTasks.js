import React from 'react';
import { Card, ListGroup } from 'react-bootstrap'

const RecentlyCompletedTasks = ({ tasks, completeTask }) => {
  let todaysDate = new Date()
  todaysDate.setDate(todaysDate.getDate() - 7)
  const completed_tasks = tasks.filter(task => task.is_completed && new Date(task.deadline).valueOf() > todaysDate.setHours(0, 0, 0, 0).valueOf()).sort((a, b) => b.id - a.id).slice(0,5)
  return (
    <Card style={{ width: '350px', maxWidth: '100%' }}>
      <Card.Header style={{ backgroundColor: '#669900', color: "#fff" }}>
        Recently Completed Tasks <i className="fa fa-fw fa-check-square-o" style={{ fontSize: '1em', marginLeft: 5 }} />
      </Card.Header>
      {
        completed_tasks.map((task, idx) =>{
          return <ListGroup.Item key={`task-item-${task.id}`}>
              <div className='float-left'>
                {task.title}
              </div>
              <div className='float-right'>
                <i className="fa fa-fw fa-check" style={{ fontSize: '1.5em', color: 'green'}} />
              </div>
          </ListGroup.Item>
        })
      }
      {completed_tasks.length === 0 ? <h5 style={{marginTop: 5, alignSelf: 'center'}}>No Completed Task!</h5> : console.log(completed_tasks) }
    </Card>
  );
}

export default RecentlyCompletedTasks;
