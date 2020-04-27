import React from 'react'
import moment from 'moment'

const WorkoutSummary = ({ workout }) => {
  return (
    <div className="card z-depth-0 workout-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{workout.title}</span>
        <p>Posted by {workout.authorFirstName} {workout.authorLastName}</p>
        <p className="grey-text">{moment(workout.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default WorkoutSummary