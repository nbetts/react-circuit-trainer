import React, { Fragment } from 'react'
import moment from 'moment'

const WorkoutSummary = ({ workout }) => {
  return (
    <Fragment>
      <p className="mb-1">{workout.title} by {workout.authorName}</p>
      <small>{moment(workout.createdAt.toDate()).calendar()}</small>
    </Fragment>
  )
}

export default WorkoutSummary