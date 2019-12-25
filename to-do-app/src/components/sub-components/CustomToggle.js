import React from 'react'
import { useAccordionToggle } from 'react-bootstrap'

const changeContent = useAccordionToggle(eventKey, () =>
  console.log('works!'),
)

const CustomToggle = ({ children, eventKey, color }) => {

  return (
    <button
      type="button"
      style={{ backgroundColor: color, color: '#fff', border: 0 }}
      onClick={changeContent}
    >
      {children}
    </button>
  )
}
export default CustomToggle