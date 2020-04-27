import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import HoldingPage from './components/holdingPage/HoldingPage'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import WorkoutDetails from './components/workout/WorkoutDetails'
import CreateWorkout from './components/workout/CreateWorkout'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/workout/:id" component={WorkoutDetails} />
          <Route path="/create" component={CreateWorkout} />

          {/* TODO: remove on website launch */}
          <Route path="/comingsoon" component={HoldingPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
