import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'


const isActive = (location, pathName) => location.pathname.includes(pathName) ? true : false

const SideNavPage = ({ location, history, children, firstProjectId }) => {
  return (
    <>
      <SideNav
        style={{ position: 'fixed' }}
        onSelect={(selected) => {
          const to = '/' + selected
          if (location.pathname !== to) {
            history.push(to)
          }
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultActiveKey='/dashboard'>
          <NavItem eventKey="dashboard" active={isActive(location, '/dashboard')}>
            <NavIcon >
              <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              DashBoard
                  </NavText>
          </NavItem>
          <NavItem eventKey={`projects/${firstProjectId}`} active={isActive(location, '/projects')}>
            <NavIcon>
              <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Projects
                  </NavText>
          </NavItem>
          {/* <NavItem eventKey="tasks" active={isActive(location, '/tasks')}>
            <NavIcon>
              <i className="fa fa-fw fa-tasks" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Tasks
                  </NavText>
          </NavItem> */}
        </SideNav.Nav>
      </SideNav>
      {children}
    </>
  )
}

export default SideNavPage
