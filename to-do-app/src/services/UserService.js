class UserService {
  constructor(component) {
    this.component = component
    this.workingURL = 'https://arcane-sands-50858.herokuapp.com'
    // this.workingURL = 'http://localhost:3000'
  }


  createUser = (user) => {
    fetch(`${this.workingURL}/users`, { //eslint-disable-line
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user
      })
    })
      .then(response => response.json())
      .then(({ token, user_id }) => {
        localStorage.token = token
        localStorage.userId = user_id
        this.component.setState({
          token: token,
          loggedInUserId: user_id,
        })
      })
  }

  login = (user) => {
    fetch(`${this.workingURL}/login`, { //eslint-disable-line
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user
      })
    })
      .then(response => response.json())
      .then(({ token, user_id }) => {
        localStorage.token = token
        localStorage.userId = user_id
        this.component.setState({
          token: token,
          loggedInUserId: user_id,
          loggedIn: true
        })
      })
  }
}
export default UserService
