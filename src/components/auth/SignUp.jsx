import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'
import Form from '../form/Form';

const SignUp = (props) => {
  const { auth, formError, signUp } = props;
  const fields = [
    { id: 'emailAddress', label: 'Email address', type: 'email' },
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'password', label: 'Password', type: 'password' },
    { id: 'confirmPassword', label: 'Confirm password', type: 'password' },
  ]

  if (auth.uid) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="container d-flex flex-column justify-content-center centered-container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6">
          <Form title="Sign up" fields={fields} formError={formError} submit={signUp} />
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
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
