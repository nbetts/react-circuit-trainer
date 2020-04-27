import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createWorkout } from '../../store/actions/workoutActions'
import { Redirect } from 'react-router-dom'

class CreateWorkout extends Component {
  state = {
    title: '',
    content: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createWorkout(this.state)
    this.props.history.push('/')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { auth } = this.props;

    // TODO: change to /signin on website launch
    if (!auth.uid) {
      return <Redirect to={'/comingsoon'} />
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Workout</h5>
          <div className="input-field">
            <label htmlFor="">Title</label>
            <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className="input-field">
            <label htmlFor="">Content</label>
            <textarea className="materialize-textarea" id="content" onChange={this.handleChange} value={this.state.content} ></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    createWorkout: (workout) => dispatch(createWorkout(workout))
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(CreateWorkout)
