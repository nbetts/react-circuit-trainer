const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGN_IN_ERROR':
      console.log('sign in error');
      return {
        ...state,
        authError: action.error.message
      }
    case 'SIGN_OUT_SUCCESS':
      return state;
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGN_UP_ERROR':
      console.log('sign up error');
      return {
        ...state,
        authError: action.error.message
      }
    default:
      return state;
  }
}

export default authReducer;