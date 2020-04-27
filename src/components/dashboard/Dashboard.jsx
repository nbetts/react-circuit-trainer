import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import WorkoutList from '../workout/WorkoutList'
import Notifications from './Notifications'

class Dashboard extends Component {
  render() {
    const { auth, workouts, notifications } = this.props;

    // TODO: change to /signin on website launch
    if (!auth.uid) {
      return <Redirect to={'/comingsoon'} />
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <WorkoutList workouts={workouts} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    workouts: state.firestore.ordered.workouts,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'workouts', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  ])
)(Dashboard)