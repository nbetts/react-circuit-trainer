import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const HoldingPage = (props) => {
  const { auth } = props;

  if (auth.uid) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="container">
      <h1 className="center">Circuit Training</h1>
      <p className="center">A circuit training web app built with React. Coming soon!</p>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(HoldingPage)
