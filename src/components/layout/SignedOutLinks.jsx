import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <li className="nav-item"><NavLink className="active nav-link px-3" to="/signin">Sign in</NavLink></li>
      <li className="nav-item"><NavLink className="active nav-link px-3" to="/signup">Sign up</NavLink></li>
    </React.Fragment>
  )
}

export default SignedOutLinks