import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import WorkoutTimer from './components/workout/WorkoutTimer'
import CreateWorkout from './components/workout/CreateWorkout'
import WorkoutDetails from './components/workout/WorkoutDetails'

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/timer" component={WorkoutTimer} />
          <Route path="/create" component={CreateWorkout} />
          <Route path="/workout/:id" component={WorkoutDetails} />
          <Redirect exact to={'/'} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
