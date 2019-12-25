import React, { useState } from "react";
import { Form, Container, Button } from 'react-bootstrap'
import UserService from '../../services/UserService'
import { Redirect } from 'react-router-dom'

const logUserIn = (username, password, parent) => {
  const userService = new UserService(parent)
  userService.login({ username, password })
}

const handleClick = (signup, username, password, parent) => {
  if (signup) {
    const userService = new UserService(parent)
    userService.createUser({ username, password })
  } else {
    logUserIn(username, password, parent)
  }
}
// const loginInForm = (username, password, setUsername, setPassword) => (

// )

const LoginPage = ({ parent, bool }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signup, setSignup] = useState(false)
  // debugger
  if(bool){
    return <Redirect to="/dashboard" />
  } else {
      return (
        <Container className='d-flex justify-content-center flex-column  h-100'>
          <div className="text-center">
            <h1 className='pt-5'>
              {signup ? "Create New Account" : "Log In"}
            </h1>
          </div>
          <div className='d-flex flex-row w-100 h-100  flex-fill justify-content-center '>
            <Form >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
            </Form>
          </div>
          <div className="w-50 d-flex align-self-center justify-content-center" >
            <Button size='sm' style={{backgroundColor: '#db3d44', borderColor: '#db3d44'}} onClick={e => handleClick(signup, username, password, parent)} variant="primary">
              {!signup ? "Log In!" : "Create Account!"}
            </Button>
            <Button size='sm' style={{backgroundColor: '#db3d44', borderColor: '#db3d44'}} onClick={e => setSignup(!signup)} variant="primary" className='ml-5 btn-outline-primaryd'>
              {!signup ? "Sign Up!" : "Log In!"}
            </Button>
          </div>
        </Container>
      )
    }
}

export default LoginPage;
