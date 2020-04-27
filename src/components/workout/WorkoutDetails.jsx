import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const WorkoutDetails = (props) => {
  const { auth, workout } = props;

  // TODO: change to /signin on website launch
  if (!auth.uid) {
    return <Redirect to={'/comingsoon'} />
  }

  if (workout) {
    return (
      <div className="container section workout-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{ workout.title }</span>
            <p>{ workout.content }</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by { workout.authorFirstName } { workout.authorLastName }</div>
            <div>{moment(workout.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">Loading workout...</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const workouts = state.firestore.data.workouts;
  const workout = workouts ? workouts[id] : null;

  return {
    auth: state.firebase.auth,
    workout: workout
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'workouts' }
  ])
)(WorkoutDetails)