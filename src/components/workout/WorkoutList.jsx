import React from 'react'
import WorkoutSummary from './WorkoutSummary'
import { Link } from 'react-router-dom'

const WorkoutList = ({ workouts }) => {
  return (
    <div className="card">
      <div className="card-body p-0">
        <h2 className="card-title m-4">Latest Workouts</h2>
        <div className="list-group list-group-flush">
          { workouts && workouts.map(workout => {
            return (
              <Link key={workout.id} to={'/workout/' + workout.id} className="list-group-item list-group-item-action flex-column align-items-start px-4">
                <WorkoutSummary workout={workout} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkoutList