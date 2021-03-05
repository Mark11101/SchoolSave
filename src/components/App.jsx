import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import SignIn from './sign-in/SignInContainer'
import AdminHomePage from './admin-home-page/AdminHomePageContainer'
import ScreenHandler from './screen-handler/ScreenHandlerContainer'
import Pupil from './pupil/PupilContainer'
import Classroom from './classroom/ClassroomContainer'
import Parent from './parent/ParentContainer'
import Camera from './camera/CameraContainer'
import AdminPage from './admin-page/AdminPageContainer'
import ScrollToTop from './scroll-to-top/ScrollToTop'
import NotificationsProvider from '../utils/notifications/NotificationsProvider'
import LogOutHandler from './log-out-handler/LogOutHandlerContainer'
import history from '../url/history'

import './App.css'
import '../styles/variables.css'
import '../styles/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = (props) => {
  const {
    role,
  } = props;

  const setPathname = (path) => {
    
    switch (role) {
      case 'admin':
        return '/home-page/school/:id' + path
      case 'school':
        return '/school/:id' + path
      case 'parent':
        return path
      default:
        return ''
    }
  }
  
  return (
    <Router history={history}>
      <ScrollToTop />
      <LogOutHandler />
      <NotificationsProvider />
      <div className="b-app">
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/home-page' component={AdminHomePage} />
          <Route exact path={setPathname('/parent/:id')} component={Parent} />
          <Route 
            exact 
            path={[
              setPathname('/class/:id/pupil/:id'),
              setPathname('/parent/:id/pupil/:id'),
            ]}
            component={Pupil} 
          />
          <Route exact path={setPathname('')} component={ScreenHandler} />
          <Route exact path={setPathname('/class/:id')} component={Classroom} />
          <Route exact path={setPathname('/camera/:id')} component={Camera} />
          <Route exact path='/home-page/admin/:id' component={AdminPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
