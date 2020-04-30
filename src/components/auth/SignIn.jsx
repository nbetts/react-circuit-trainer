import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Form from '../form/Form';

const SignIn = (props) => {
  const { auth, formError, signIn } = props;
  const fields = [
    { id: 'emailAddress', label: 'Email address', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
  ]

  if (auth.uid) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="container d-flex flex-column justify-content-center centered-container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6">
          <Form title="Sign in" fields={fields} formError={formError} submit={signIn} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    formError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
