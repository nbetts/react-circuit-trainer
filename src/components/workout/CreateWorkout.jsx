import React from 'react'
import { connect } from 'react-redux'
import { createWorkout } from '../../store/actions/workoutActions'
import { Redirect } from 'react-router-dom'
import Form from '../form/Form'

const CreateWorkout = (props) => {
  const { formError, createWorkout } = props;
  const fields = [
    { id: 'title', label: 'Title', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
  ]

  // Redirect if a workout was successfully created.
  if (formError === null) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="container d-flex flex-column justify-content-center centered-container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6">
          <Form title="Create workout" fields={fields} formError={formError} submit={createWorkout} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    formError: state.workout.workoutError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createWorkout: (workout) => dispatch(createWorkout(workout))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkout)
