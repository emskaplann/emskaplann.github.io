import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import SideNavPage from './components/sub-components/SideNav.js';
import LoginPage from './components/main-components/LoginPage';
import DashBoard from './components/main-components/DashBoard.js'
import Projects from './components/main-components/Projects.js'
import { Route, useParams, Switch } from 'react-router-dom'
import './App.css';
import { MainViewRenderProps } from './components/main-components/MainViewRenderProps.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loggedInUserId: null,
      projects: []
    }
  }

  authProps = () => ({ token: this.state.token, loggedInUserId: this.state.loggedInUserId })

  componentDidMount() {
    this.setState({
      token: localStorage.token,
      loggedInUserId: localStorage.userId
    }, this.fetchForFirstProjectId)
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      token: null,
      loggedInUserId: null
    })
  }

  fetchForFirstProjectId = () => {
      fetch(`https://arcane-sands-50858.herokuapp.com/users/${this.state.loggedInUserId}/projects`, {
        headers: {
          "Authorization": this.state.token
        }
      }).then(response => {
        if (response.status > 199 && response.status < 300) return response.json()
        throw response.statusText
      }).then(projects => {
        this.setState({ projects })
      }).catch(reason => console.log(reason))
  }

  showSideNavWithMain = ({ location, history }) => (
    <SideNavPage location={location} firstProjectId={this.state.projects[0].id} history={history}>
      <main style={{ marginLeft: 75, marginTop: 25 }}>
        <Switch>
          <Route path="/dashboard" exact component={props => <MainViewRenderProps children={DashBoard} authProps={this.authProps()} />} />
          <Route path="/projects/:id" component={props => <MainViewRenderProps children={Projects} id={useParams().id} authProps={this.authProps()} />} />
          {/* <Route path="/tasks" component={props => <MainViewRenderProps children={Tasks} authProps={this.authProps()} />} /> */}
        </Switch>
      </main>
    </SideNavPage>
  )

  render() {
    return <>
      <Navbar variant="dark" style={{ backgroundColor: '#db3d44' }}>
        <Navbar.Brand href="#home">
          <i className="fa fa-fw fa-check-square-o" style={{ fontSize: '1em', marginLeft: 60 }} />
          <span className='ml-2'>ToDo App</span>
        </Navbar.Brand>
        {this.state.token ?
          <Navbar.Collapse className="justify-content-end" onClick={() => this.logout()} style={{color: '#fff'}}>
             <strong>Logout</strong><i className="fa fa-fw fa-sign-out" style={{ fontSize: '1em', marginLeft: 5 }} />
          </Navbar.Collapse>
          : null
        }

      </Navbar>
      {this.state.token ? this.showSideNavWithMain(this.props) : <LoginPage parent={this} />}
    </>
  }
}

export default App;
