import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import moment from 'moment'

const WorkoutDetails = (props) => {
  const { workout } = props;

  if (workout) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ workout.title }</h5>
          <h6 className="card-subtitle mb-2 text-muted">Posted by { workout.authorName }</h6>
          <p className="card-text">{ workout.description }</p>
          <small>{moment(workout.createdAt.toDate()).calendar()}</small>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container text-center">Loading workout...</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const workouts = state.firestore.data.workouts;
  const workout = workouts ? workouts[id] : null;

  return {
    workout: workout
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'workouts' }
  ])
)(WorkoutDetails)