import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  const { profile } = props;
  const initial = profile.isEmpty ? 'U' : profile.name[0].toUpperCase();
  
  return (
    <React.Fragment>
      <li className="nav-item"><NavLink className="active nav-link px-4" to="/create">Create workout</NavLink></li>
      <li className="nav-item"><NavLink className="active nav-link px-4" to="/" onClick={props.signOut}>Sign out</NavLink></li>
      <li className="nav-item"><NavLink className="active nav-link mx-2 bg-primary rounded-circle text-center profile-link" to={'/'}>{ initial }</NavLink></li>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)