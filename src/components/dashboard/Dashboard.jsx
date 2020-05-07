import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import WorkoutList from '../workout/WorkoutList'
import Notifications from './Notifications'
import Timer from '../timer/Timer'

class Dashboard extends Component {
  render() {
    const { workouts, notifications } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Timer />
          </div>
          <div className="w-100"></div>
          <div className="col">
            <WorkoutList workouts={workouts} />
          </div>
          <div className="col">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.firestore.ordered.workouts,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'workouts', limit: 10, orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] },
  ])
)(Dashboard)