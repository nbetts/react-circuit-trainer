import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const HoldingPage = (props) => {
  const { auth } = props;

  if (auth.uid) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="container d-flex flex-column justify-content-center centered-container">
      <div className="row justify-content-center text-center">
        <div className="col">
          <h1 className="display-1 mb-4">Circuit Training</h1>
          <p className="lead">A circuit training web app built with React. Coming soon!</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(HoldingPage)
