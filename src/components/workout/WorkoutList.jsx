import React from 'react'
import WorkoutSummary from './WorkoutSummary'
import { Link } from 'react-router-dom'

const WorkoutList = ({ workouts }) => {
  return (
    <div className="workout-list section">
      {
        workouts && workouts.map(workout => {
          return (
            <Link to={'/workout/' + workout.id} key={workout.id}>
              <WorkoutSummary workout={workout} />
            </Link>
          )
        })
      }
    </div>
  )
}

export default WorkoutList